import type {Location} from "../@types/location";
import type {Character} from "../@types/character";
import {getCharacter} from "../api/characters.ts";
import {depositExceptItem} from "../utils/bank.ts";
import {isInventoryFull} from "../utils/inventory.ts";
import {gather} from "../api/actions/gathering.ts";
import {log} from "../lib/logger.ts";
import {sleep} from "../utils/sleep.ts";
import {moveTo} from "../utils/moveTo.ts";

export async function rawResourceCycle(characterName: string, location: Location, signal: AbortSignal) : Promise<void> {
    try{
        let character: Character = await getCharacter(characterName);



        character = await depositExceptItem(character);
        while (!signal.aborted){
            const moveResult = await moveTo(character, location);
            if(moveResult) character = moveResult;

            while (!isInventoryFull(character)){
                try{
                    const result = await gather(characterName);
                    character = result.character;

                    const dropStr = result.details.items
                        .map((item) => `${item.quantity}x ${item.code}`)
                        .join(", ");

                    log(`Gathered successfully! Gained: ${dropStr}`, "success", characterName);
                    log(`${result.details.xp} XP gained.`, "info", characterName);
                    log(`Cooldown started: ${result.cooldown.total_seconds}s`, "info", characterName);

                    await sleep(result.cooldown.total_seconds * 1000);
                } catch (error) {
                    log(error instanceof Error ? error.message : String(error), "error", characterName);
                    break;
                }
            }

            character = await depositExceptItem(character);
        }
    } catch (error) {

        if (error instanceof DOMException && error.name === "AbortError") {
            log('Loop stopped.', "warn", characterName)
            return;
        }
        log(error instanceof Error ? error.message : String(error), "error", characterName);
    }
}