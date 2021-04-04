import { Document, model, Schema, Date } from "mongoose"

const SessionSchema = new Schema({
    gaiaId: { type: String, required: true },
    token: { type: String, required: true },
    expires: { type: Date, required: true }
})

export interface Session extends Document {
    gaiaId: string
    token: string
    expires: Date
}

export default model<Session>('Session', SessionSchema);