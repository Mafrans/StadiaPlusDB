import {Document, model, Schema} from "mongoose"

const GameSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
})

export interface Game extends Document {
    id: string
    name: string
}

export default model<Game>('Game', GameSchema);