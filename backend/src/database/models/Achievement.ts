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
    _id: Schema.Types.ObjectId
    index: number
    timestamp: Date
    name: string
    description?: string
    imageURL?: string
    game?: Game['id']
    user?: string
}

export default model<Achievement>('Achievement', AchievementSchema);