import {Document, model, Schema} from "mongoose"

const GameSchema = new Schema({
    id: String,
    playTime: Number,
    achievementCount: Number,
    name: String
})

export interface Game extends Document {
    _id: Schema.Types.ObjectId
    id: string
    playTime: number
    achievementCount: number
    name: string
}

export default model<Game>('Game', GameSchema);