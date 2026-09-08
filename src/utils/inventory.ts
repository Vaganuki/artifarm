import type {Character, CharacterInventoryItem} from "../@types/character";
import type {Item} from "../@types/item";

export function isInventoryFull(character: Character) : boolean {
    const usedSlots = character.inventory.reduce((sum, item) => sum + item.quantity, 0);
    return usedSlots >= character.inventory_max_items;
}

export function findItem(inventory: CharacterInventoryItem[], code: string) : CharacterInventoryItem | null {
    return inventory.find((item) => item.code === code ) ?? null;
}

export function findHealingItem(
    inventory: CharacterInventoryItem[],
    itemsByCode: Map<string, Item>
): Item | null {
    for (const item of inventory) {
        if (!item.code) continue;
        const found = itemsByCode.get(item.code);
        if (found?.effects?.[0]?.code === "heal") {
            return found;
        }
    }
    return null;
}