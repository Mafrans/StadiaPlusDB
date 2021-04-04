import { Document, model, Schema } from "mongoose"
import {Game} from "./Game";
import {User} from "./User";

const AchievementSchema = new Schema({
    index: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    name: { type: String, required: true },
    description: String,
    imageURL: String,
    game: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId
})

export interface Achievement extends Document {
    index: number
    timestamp: Date
    name: string
    description?: string
    imageURL?: string
    game?: Game['_id']
    user?: User['_id']
}

export default model<Achievement>('Achievement', AchievementSchema);