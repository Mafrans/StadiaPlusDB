import {Document, model, Schema} from "mongoose";
import GameSchema, {Game} from "./Game";
import {Achievement} from "./Achievement";
import {User} from "./User";

const HistoryEntrySchema = new Schema({
    timestamp: { type: Date, required: true },
    type: { type: String, required: true },
    game: { type: Schema.Types.ObjectId, ref: 'Game' },
    playTime: Number,
    achievements: { type: [Schema.Types.ObjectId], ref: 'Achievement' }
})

export interface HistoryEntry extends Document {
    _id: Schema.Types.ObjectId
    timestamp: Date
    type: 'progress' | 'unlock' | 'patreon'
    game?: Game['_id']
    playTime: Number
    achievements?: Achievement['_id'][]
}

export function generateHistoryText(entry: HistoryEntry, game: Game, user: User, playTime: number): string {
    let text = user.names[0];
    if (playTime !== 0) {
        text += ` played ${game.name} for ${playTime / 3600} hours`;
    }

    if (entry.achievements.length > 0) {
        if(playTime) {
            text += ' and';
        }
        text += ` reached ${entry.achievements.length} achievements`;
    }
    text += '.';

    return text;
}


export default model<HistoryEntry>('HistoryEntry', HistoryEntrySchema);