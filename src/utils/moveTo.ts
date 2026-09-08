import type {Character} from "../@types/character";
import type {Location} from "../@types/location";
import {moveAction} from "../api/actions/move.ts";
import {log} from "../lib/logger.ts";
import {sleep} from "./sleep.ts";

export async function moveTo(character: Character, location: Location): Promise<Character> {
    try{
        const result = await moveAction(character.name, location.x, location.y);

        log(`Moved to (${result.destination.x}, ${result.destination.y}) on ${result.destination.name}`, "success", character.name);
        log(`Cooldown started: ${result.cooldown.total_seconds} seconds`, "info", character.name);

        await sleep(result.cooldown.total_seconds*1000);

        return result.character;
    } catch(err) {
        if (err instanceof DOMException && err.name === "AbortError") throw err;
        log(err instanceof Error ? err.message : String(err), 'error', character.name);
        return character;
    }
}