import type {CharacterInventoryItem} from "../@types/character";

export function findItem(inv : CharacterInventoryItem[], code: string): CharacterInventoryItem | null {
    return inv.find( i => i.code === code) ?? null;
}