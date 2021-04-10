import mongoose from "mongoose";
import {User} from "./models/User";
import InventoryItemSchema, {InventoryItem} from "./models/InventoryItem";
import {PatreonTier} from "../auth/model";
import {byberpunkBackground} from "../items/items";
import {PatreonInfo} from "./models/PatreonInfo";

export async function connectMongoose(uri: string) {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

export async function giveInventoryItem(user: User, item: InventoryItem) {
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

export function setPatreonInfo(user: User, info: PatreonInfo) {
    user.patreon = info;
    user.save();

    const tier: PatreonTier = info.tier;

    // Bronze tier rewards
    if (tier === 'bronze' || tier === 'silver' || tier === 'gold') {
    }

    // Silver tier rewards
    if (tier === 'silver' || tier === 'gold') {
        void giveInventoryItem(user, byberpunkBackground);
    }

    // Gold tier rewards
    if (tier === 'gold') {
    }
}