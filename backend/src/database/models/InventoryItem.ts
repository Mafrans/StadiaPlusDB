import {Document, model, Schema} from "mongoose"
import {Game} from "./Game";
import {HistoryEntry} from "./HistoryEntry";
import {PatreonTier} from "../../auth/model";

export const InventoryItemSchema = new Schema({
    owner: { type: String, required: true },
    timestamp: { type: Date, required: true },
    type: { type: String, required: true },
    thumbnail: { type: String, required: true },
    name: { type: String, requireed: true }
})

export interface InventoryItem {
    owner?: string
    timestamp: Date,
    type: 'background' | 'ornament'
    thumbnail: string
    name: string
}

interface InventoryItemDoc extends InventoryItem, Document {}

export default model<InventoryItemDoc>('InventoryItem', InventoryItemSchema);