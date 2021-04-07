import {Document, model, Schema} from "mongoose"
import {Game} from "./Game";
import {HistoryEntry} from "./HistoryEntry";
import {PatreonReward} from "../../auth/model";
const UserSchema = new Schema({
    _id: String,
    createdAt: { type: Date, required: true },
    avatar: String,
    names: { type: [String], required: true },
    searchNames: { type: [String], required: true },
    location: String,
    score: { type: Number, required: true },
    patreonPledge: Number,
    patreonTier: String,
    history: { type: [Schema.Types.ObjectId], ref: 'HistoryEntry', required: true },
    games: { type: [Schema.Types.ObjectId], ref: 'Game', required: true }
})

export interface User extends Document {
    _id: string
    createdAt: Date
    avatar: string
    names: string[]
    searchNames: string[]
    location?: string
    score: number
    patreonPledge: number
    patreonTier: string
    history: HistoryEntry['_id'][]
    games: Game['_id'][]
}

export default model<User>('User', UserSchema);