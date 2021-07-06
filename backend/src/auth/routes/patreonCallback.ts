import {NextFunction, Response} from "express";
import {getPatreonTier, PatreonRequest, PatreonUser} from "../model";
import {oauth, patreon} from "patreon";
import {Buffer} from "buffer";
import {Deserializer as JSONAPIDeserializer} from "jsonapi-serializer";
import {setPatreonInfo} from "../../database/helpers";
import {prisma} from "../../index";

const oauthClient = oauth(process.env.PATREON_CLIENT_ID, process.env.PATREON_CLIENT_SECRET);

// Route methods
export async function authPatreonCallback(req: PatreonRequest, res: Response, next: NextFunction) {
    const grantCode = req.query.code;

    const tokenURL = new URL('https://patreon.com/api/oauth2/token');
    tokenURL.searchParams.append('code', grantCode as string);
    tokenURL.searchParams.append('grant_type', 'authorization_code');
    tokenURL.searchParams.append('client_id', process.env.PATREON_CLIENT_ID);
    tokenURL.searchParams.append('client_secret', process.env.PATREON_CLIENT_SECRET);
    tokenURL.searchParams.append('redirect_uri', process.env.PATREON_CALLBACK_URL);
    const tokens = await (await fetch(tokenURL.toString(), { method: 'POST' })).json();

    const patreonUserResponse = await (await fetch('https://www.patreon.com/api/oauth2/api/current_user', {
        headers: {
            Authorization: 'Bearer ' + tokens.access_token
        }
    })).json();

    const patreonUser = await new JSONAPIDeserializer({}).deserialize(patreonUserResponse) as PatreonUser;
    console.log(patreonUser.pledges[0]);

    if (patreonUser.pledges.length === 0) {
        return res.redirect(req.session.redirect);
    }

    const pledge = patreonUser.pledges[0];
    const tier = getPatreonTier(pledge["amount-cents"]);

    setPatreonInfo({
        patreonId: patreonUser.id,
        tier: tier,
        amount: pledge['amount-cents']
    }, req.session.login.data);

    const responseData = Buffer.from(JSON.stringify({
        firstName: patreonUser["first-name"],
        lastName: patreonUser["last-name"],
        tier: tier,
    }), 'utf-8').toString('base64');

    res.redirect(req.session.redirect + '#' + responseData);
}