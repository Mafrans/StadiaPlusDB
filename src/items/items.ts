import {InventoryItem} from "../database/models/InventoryItem";
import Byberpunk from "url:./images/byberpunk.png";

export const byberpunkBackground: InventoryItem = {
    name: "Byberpunk",
    thumbnail: Byberpunk,
    timestamp: new Date(),
    type: 'background'
}