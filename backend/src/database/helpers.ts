import {PatreonTier} from "../auth/model";
import {prisma} from "../index";
import {PatreonInfo} from "@prisma/client";

/*
export async function giveInventoryItem(user: any, item: any) {
    console.log('wowzers!', item.name);
    if (!await hasInventoryItem(user, item)) {
        console.log('adding!', item.name);
        const itemSchema = new InventoryItemSchema(item);
        itemSchema.owner = user['_id'];
        void itemSchema.save();
    }
}

export async function hasInventoryItem(user: User, item: InventoryItem): Promise<boolean> {
    return await InventoryItemSchema.countDocuments({ owner: user['_id'], name: item.name }).exec() > 0;
}
*/

type PartialPatreonInfo = {
    patreonId: string,
    tier: PatreonTier,
    amount: number
}

export async function setPatreonInfo(patreonInfo: PartialPatreonInfo, googleId?: string) {
    let filter: any = {patreonId: patreonInfo.patreonId};
    if (googleId) {
        filter = {user: {googleId}};
    }
    const user = await prisma.user.findUnique({where: {googleId}});

    prisma.patreonInfo.upsert({
        where: {
            ...filter
        },
        create: {
            ...patreonInfo,
            user: { connect: user }
        },
        update: {
            tier: patreonInfo.tier,
            amount: patreonInfo.amount
        }
    });

    const tier: PatreonTier = patreonInfo.tier as PatreonTier;

    // Bronze tier rewards
    if (tier === 'bronze' || tier === 'silver' || tier === 'gold') {
    }

    // Silver tier rewards
    if (tier === 'silver' || tier === 'gold') {
        //void giveInventoryItem(user, byberpunkBackground);
    }

    // Gold tier rewards
    if (tier === 'gold') {
    }
}