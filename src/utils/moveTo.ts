import type {Character} from "../@types/character";
import type {Location} from "../@types/location";
import {moveAction} from "../api/actions/move.ts";
import {log} from "../lib/logger.ts";
import {sleep} from "./sleep.ts";
import {getApiErrorMessage} from "./apiError.ts";

export async function moveTo(character: Character, location: Location): Promise<Character> {
    try{
        const result = await moveAction(character.name, location.x, location.y);

        log(`Moved to (${result.destination.x}, ${result.destination.y}) on ${result.destination.name}`, "success", character.name);

        await sleep(character.name, result.cooldown.total_seconds*1000);

        return result.character;
    } catch(err) {
        if (err instanceof DOMException && err.name === "AbortError") throw err;
        log(getApiErrorMessage(err), "error", character.name);
        return character;
    }
}