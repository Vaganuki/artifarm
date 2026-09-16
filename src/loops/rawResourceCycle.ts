import type {Location} from "../@types/location";
import {log} from "../lib/logger.ts";
import {getApiErrorMessage} from "../utils/apiError.ts";
import type {Character} from "../@types/character";
import {getCharacter} from "../store/characterStore.ts";
import {depositItemExcept} from "../utils/bank.ts";

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

            }
        }

    } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
            log("Loop stopped.", 'warn', characterName);
            return;
        }
        log(getApiErrorMessage(err), "error", signal);
    }

}