import { Document, model, Schema } from "mongoose"
import {Game} from "./Game";
import {User} from "./User";

const AchievementSchema = new Schema({
    index: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    name: { type: String, required: true },
    description: String,
    imageURL: String,
    game: { type: Schema.Types.ObjectId, ref: 'Game'},
    user: String
})

export interface Achievement extends Document {
    _id: Game['_id']
    index: number
    timestamp: Date
    name: string
    description?: string
    imageURL?: string
    game?: Game['_id']
    user?: string
}

export default model<Achievement>('Achievement', AchievementSchema);