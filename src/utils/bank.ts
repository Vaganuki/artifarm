import type {Character} from "../@types/character";
import {depositItem} from "../api/actions/bank.ts";
import {BANK} from "../data/locations.ts";
import {moveTo} from "./moveTo.ts";
import {log} from "../lib/logger.ts";
import {getApiErrorMessage} from "./apiError.ts";
import {sleep} from "./sleep.ts";

export async function depositItemExcept(
    character: Character,
    exceptedCode: string,
    signal?: AbortSignal,
): Promise<Character> {
    // Making a character proxy for the function
    let current = character;

    //If not at the bank, moving to the bank; Will have to check nearest bank later.
    if (current.x !== BANK.x || current.y !== BANK.y) {
        const move_res = await moveTo(current, BANK);
        if (move_res) current = move_res;
    }

    const depositPayload = current.inventory
        .filter((item) => item.code !== exceptedCode && item.quantity > 0)
        .map((item) =>({
            code: item.code,
            quantity: item.quantity,
        }));

    if (depositPayload.length === 0 ) return current;

    signal?.throwIfAborted();

    try{
        const res = await depositItem(current.name, depositPayload);
        current = res.character;

        for (const deposit of res.items) {
            log(`Deposited ${deposit.code} x${deposit.quantity}`, 'success', current.name);
        }
        await sleep(current.name, res.cooldown.total_seconds*1000, signal);

    } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") throw err;
        log(getApiErrorMessage(err), "error", character.name);
        return current;
    }

    return current;
}