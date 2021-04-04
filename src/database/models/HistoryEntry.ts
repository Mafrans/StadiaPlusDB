import {Document, model, Schema} from "mongoose"
import {Game} from "./Game";
import {Achievement} from "./Achievement";

const HistoryEntrySchema = new Schema({
    timestamp: { type: Date, required: true },
    text: { type: String, required: true },
    type: { type: String, required: true },
    game: Schema.Types.ObjectId,
    achievements: [Schema.Types.ObjectId]
})

export interface HistoryEntry extends Document {
    timestamp: Date
    text: string
    type: 'achievements' | 'playtime' | 'unlock' | 'patreon'
    game?: Game['_id']
    achievements?: Achievement['_id'][]
}


export default model<HistoryEntry>('HistoryEntry', HistoryEntrySchema);