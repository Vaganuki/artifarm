import type {Character} from "../@types/character";
import {depositItem} from "../api/actions/bank.ts";
import {log} from "../lib/logger.ts";
import {sleep} from "./sleep.ts";
import {moveTo} from "./moveTo.ts";
import {BANK} from "../data/locations.ts";

export async function depositExceptItem (character: Character, exceptItemCode?: string, signal?: AbortSignal) : Promise<Character> {
    let current = character;

    const moveResult =  await moveTo(current, BANK);
    if (moveResult) current = moveResult;


    for (const invItem of character.inventory) {
        if (!invItem.code || invItem.code === exceptItemCode || invItem.quantity <= 0) continue;

        signal?.throwIfAborted();
        try{
            const result = await depositItem(current.name, [{code: invItem.code, quantity: invItem.quantity}]);
            current = result.character;

            log(`Deposited ${invItem.quantity} x${invItem.quantity}`, "info", current.name);
            await sleep(result.cooldown.total_seconds * 1000);
        } catch (e) {
            if (e instanceof DOMException && e.name === 'AbortError') throw e;
            log(e instanceof Error ? e.message : String(e), 'error', current.name);
            break;
        }
    }
    return current;
}