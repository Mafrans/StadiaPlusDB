import {Document, model, Schema} from "mongoose"
import {Game} from "./Game";
import {HistoryEntry} from "./HistoryEntry";
import {PatreonInfo, PatreonInfoSchema} from "./PatreonInfo";
const UserSchema = new Schema({
    _id: String,
    createdAt: Date,
    avatar: String,
    names: [String],
    searchNames: [String],
    location: String,
    score: Number,
    patreon: PatreonInfoSchema,
    history: { type: [Schema.Types.ObjectId], ref: 'HistoryEntry' },
    games: { type: [Schema.Types.ObjectId], ref: 'Game' }
})

export interface User extends Document {
    _id: string
    createdAt: Date
    avatar: string
    names: string[]
    searchNames: string[]
    location?: string
    score: number
    patreon: PatreonInfo
    history: HistoryEntry['_id'][]
    games: Game['_id'][]
}

export default model<User>('User', UserSchema);