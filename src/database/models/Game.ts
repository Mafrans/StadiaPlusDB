import {Document, model, Schema} from "mongoose"

const GameSchema = new Schema({
    id: { type: String, required: true },
    playTime: { type: Number, required: true },
    name: { type: String, required: true }
})

export interface Game extends Document {
    _id: Schema.Types.ObjectId
    id: string
    playTime: number
    name: string
}

export default model<Game>('Game', GameSchema);