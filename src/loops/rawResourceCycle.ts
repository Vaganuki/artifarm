import type {Location} from "../@types/location";
import {log} from "../lib/logger.ts";
import {getApiErrorMessage} from "../utils/apiError.ts";
import type {Character} from "../@types/character";
import {getCharacter} from "../store/characterStore.ts";
import {depositItemExcept} from "../utils/bank.ts";
import {moveTo} from "../utils/moveTo.ts";
import {gather} from "../api/actions/gathering.ts";
import {sleep} from "../utils/sleep.ts";
import {isInventoryFull} from "../utils/inventory.ts";

export async function rawResourceCycle(
    characterName: string,
    location: Location,
    signal: AbortSignal,

): Promise<void>{

    try{
        let char : Character | undefined = getCharacter(characterName);
        if (!char) {
            throw new Error(`Character ${characterName} not found; Has the store loaded yet ?`);
        } else {

            while(!signal.aborted) {

                char = await depositItemExcept(char,"", signal);
                char = await moveTo(char, location);

                while(!isInventoryFull(char) && !signal.aborted) {
                    try{
                        const res = await gather(characterName);
                        char = res.character;

                        const drop_str = res.details.items.map(i => `${i.code} x${i.quantity}`)?.join(", ");

                        log(`👇 Gathered successfully! Gained: ${drop_str}`, 'success', characterName);
                        log(`🌟 ${res.details.xp} XP gained.`, 'success', characterName);

                        await sleep(characterName,res.cooldown.total_seconds*1000, signal);

                    } catch (err) {
                        if (err instanceof DOMException && err.name === "AbortError") {
                            log("Loop stopped.", 'warn', characterName);
                            return;
                        }
                        log(getApiErrorMessage(err), "error", characterName);
                    }
                }
            }
        }

    } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
            log("Loop stopped.", 'warn', characterName);
            return;
        }
        log(getApiErrorMessage(err), "error", characterName);
    }

}