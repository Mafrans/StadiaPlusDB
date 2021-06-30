import {Document, model, Schema} from "mongoose";
import GameSchema, {Game} from "./Game";
import {Achievement} from "./Achievement";
import {User} from "./User";

const HistoryEntrySchema = new Schema({
    timestamp: Date,
    type: String,
    game: { type: Schema.Types.ObjectId, ref: 'Game' },
    playTime: Number,
    user: { type: String, ref: 'User' },
    achievements: { type: [Schema.Types.ObjectId], ref: 'Achievement' }
})

export interface HistoryEntry extends Document {
    _id: Schema.Types.ObjectId
    timestamp: Date
    type: 'progress' | 'unlock' | 'patreon'
    game?: Game['_id']
    playTime: number
    user: User['_id']
    achievements?: Achievement['_id'][]
}

export default model<HistoryEntry>('HistoryEntry', HistoryEntrySchema);