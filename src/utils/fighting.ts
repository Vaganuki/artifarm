import type {Character} from "../@types/character";
import {getItemsByCode} from "../store/itemsStore.ts";
import {getBankItems} from "../store/bankStore.ts";
import {log} from "../lib/logger.ts";
import {moveTo} from "./moveTo.ts";
import {BANK} from "../data/locations.ts";
import {sleep} from "./sleep.ts";
import {useItem} from "../api/actions/useItem.ts";

export async function getHealingItem(character: Character, signal ?: AbortSignal): Promise<Character> {
    const itemsByCode = getItemsByCode();
    const bankItems = getBankItems();

    const healingBankItem = bankItems.find ( bankItem => {
        const item = itemsByCode.get(bankItem.code);
        return item?.effects?.[0]?.code ==="heal";
    });

    if (!healingBankItem) {
        log("No healing items found in bank.", "warn", character.name);
        return character;
    }

    const moveResult = await moveTo(character, BANK);
    let current = moveResult || character;

    const result = await withdrawItems(current.name, [
        {code: healingBankItem.code, quantity: healingBankItem.quantity},
    ]);

    current = result.character;

    log(`Withdrew ${healingBankItem.code} x${healingBankItem.quantity}`, "success", character.name);
    await sleep(result.cooldown.total_seconds * 1000, signal);

    return current;
}

export async function healing(
    character: Character,
    code: string,
    quantity: number,
    signal?: AbortSignal
): Promise<Character> {
    const result = await useItem(character.name, code, quantity);
    log(`Used ${quantity}x ${code} to heal`, "success", character.name);
    await sleep(result.cooldown.total_seconds * 1000, signal);
    return result.character;
}