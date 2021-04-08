import {NextFunction, Request, Response, Router} from "express";
import passport from "passport";
import {Deserializer as JSONAPIDeserializer} from "jsonapi-serializer";
import {getPatreonReward, PatreonUser} from "../../auth/model";
import crypto from "crypto";
import UserSchema, {User} from "../../database/models/User";

// Route methods
export async function patreonHook(req: Request, res: Response, next: NextFunction) {
    const signature = req.headers['x-patreon-signature'] as string;

    console.log(req.headers);

    const hmac = crypto.createHmac('md5', process.env.PATREON_WEBHOOK_SECRET);
    console.log(req.body);
    hmac.update(req.body);
    const digest = hmac.digest('hex');
    hmac.end();

    console.log({digest, signature});

    if (digest !== signature) {
        return res.end();
    }

    const hookBody = await new JSONAPIDeserializer({}).deserialize(JSON.parse(req.body)) as PledgeHook;
    const event: PledgeHookEvent = req.headers['x-patreon-event'] as PledgeHookEvent;

    const user = await UserSchema.findOne({ 'patreon.id': hookBody.user.id });
    console.log({user});
    if (!user) {
        return res.end();
    }

    switch (event) {
        case "members:pledge:create":
        case "members:pledge:update":
        case "members:create":
        case "members:update":
            updatePatreonInfo(user, hookBody);
            break;

        case "members:delete":
        case "members:pledge:delete":
            resetPatreonInfo(user, hookBody);
            break;
    }

    res.end();
}

function resetPatreonInfo(user: User, body: PledgeHook) {
    console.log('resetPatreonInfo');
    user.patreon.amount = 0;
    user.patreon.tier = 'none';

    user.save();
}

function updatePatreonInfo(user: User, body: PledgeHook) {
    console.log('updatePatreonInfo');
    user.patreon.amount = body["currently-entitled-cents"];
    user.patreon.tier = getPatreonReward(user.patreon.amount);

    user.save();
}

type PledgeHookEvent = 'members:create' | 'members:update'
                 | 'members:delete' | 'members:pledge:create'
                 | 'members:pledge:update' | 'members:pledge:delete';

interface PledgeHook {
    'campaign-lifetime-support-cents': number
    'currently-entitled-cents': number
    user: PatreonUser
    'is-follower': boolean
    'last-charge-date': Date
    'next-charge-date': Date
    note: string
    'patron-status': 'former_patron' | 'active_patron'
    'pledge-relationship-start': Date
    'will-pay-amount-cents': number
}