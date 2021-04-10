import {Document, model, Schema} from "mongoose"
import {Game} from "./Game";
import {HistoryEntry} from "./HistoryEntry";
import {PatreonTier} from "../../auth/model";
export const PatreonInfoSchema = new Schema({
    id: String,
    tier: String,
    amount: Number
})

export interface PatreonInfo extends Document {
    id: string
    tier: PatreonTier,
    amount: number
}

export default model<PatreonInfo>('PatreonInfo', PatreonInfoSchema);