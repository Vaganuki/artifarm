import type {Character, CharacterInventoryItem} from "../@types/character";
import type {Item} from "../@types/item";
import {getItemsByCode} from "../store/itemsStore.ts";
import {getBankItems} from "../store/bankStore.ts";
import {log} from "../lib/logger.ts";
import {moveTo} from "./moveTo.ts";
import {BANK} from "../data/locations.ts";
import {withdrawItems} from "../api/actions/bank.ts";
import {sleep} from "./sleep.ts";
import {useItem} from "../api/actions/useItem.ts";

export function findItem(inv : CharacterInventoryItem[], code: string): CharacterInventoryItem | null {
    return inv.find( i => i.code === code) ?? null;
}

export function findOtherItem(inventory:CharacterInventoryItem[], code: string): CharacterInventoryItem | null {
    return inventory.find( i => i.code !== code && i.code !=='' && i.quantity > 0 ) ?? null;
}

export function findHealingItem(inventory:CharacterInventoryItem[], itemsByCode: Map<string, Item>): Item | null {
    for (const invItem of inventory) {
        if(!invItem.code) continue;
        const found = itemsByCode.get(invItem.code);
        if(found?.effects?.[0]?.code === "heal") {
            return found;
        }
    }
    return null;
}

export function isInventoryFull(character: Character): boolean{
    const total = character.inventory.reduce((sum, item) => sum + item.quantity, 0)
    return total >= character.inventory_max_items;
}

export async function grabHealingItem(character:Character, signal?:AbortSignal): Promise<Character> {
    const itemsByCode = getItemsByCode();
    const bankItems = getBankItems();

    const healingBankItem = bankItems.find( bankItem => {
        const item = itemsByCode.get(bankItem.code);
        return item?.effects?.[0]?.code === "heal";
    });
    console.log(healingBankItem);
    if (!healingBankItem) {
        log("No healing item found in bank.", 'warn', character.name);
        return character;
    }

    const moveResult = await moveTo(character, BANK);
    let current = moveResult || character;
    const usedInvSpace = character.inventory.reduce((sum, item) => sum + item.quantity, 0)
    const withdrawQuantity = Math.min(30, current.inventory_max_items - usedInvSpace, healingBankItem.quantity);

    const res = await withdrawItems(current.name, [
        {code: healingBankItem.code, quantity: withdrawQuantity},
    ]);
    current = res.character

    log(`Withdrew ${healingBankItem.code} x${withdrawQuantity} for healing`, "success", current.name);
    await sleep(current.name,res.cooldown.total_seconds * 1000, signal);

    return current;
}

export async function useInvItem(
    character: Character,
    code: string,
    quantity: number,
    signal?: AbortSignal
): Promise<Character> {

    const res = await useItem(character.name, code, quantity);
    log(`Used ${quantity} x${code}`, "success", character.name);
    await sleep(res.character.name, res.cooldown.total_seconds * 1000, signal);

    return res.character;
}