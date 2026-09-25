import type {CraftCycleParams} from "../@types/craftCycle";
import {getCharacter} from "../store/characterStore.ts";
import {findItem, findOtherItem, isInventoryFull} from "../utils/inventory.ts";
import {depositItemExcept} from "../utils/bank.ts";
import {moveTo} from "../utils/moveTo.ts";
import {gather} from "../api/actions/gathering.ts";
import {log} from "../lib/logger.ts";
import {sleep} from "../utils/sleep.ts";
import {getApiErrorMessage} from "../utils/apiError.ts";
import {craftItem} from "../api/actions/craft.ts";

export async function craftCycle(params:CraftCycleParams, signal: AbortSignal): Promise<void> {
    const {characterName, craftRatio, workshopLocation, gatherLocation, productCode, rawCode} = params;

    let character = getCharacter(characterName);
    if (!character) return;

    while(!signal.aborted) {
        console.log('Benninging ',character, isInventoryFull(character))
        console.log('findOtherItem', findOtherItem(character.inventory, rawCode))
        if (isInventoryFull(character) || findOtherItem(character.inventory, rawCode)) {
            character = await depositItemExcept(character, rawCode, signal);
        }

        try{
            console.log('Moving gather')
            const gatherMove = await moveTo(character, gatherLocation);
            console.log(gatherMove);
            if (gatherMove) character = gatherMove;
        } catch (err) {
            if (err instanceof DOMException && err.name === "AbortError") {
                log("Loop stopped.", 'warn', characterName);
                return;
            }
            log(getApiErrorMessage(err), "error", characterName);
            return;
        }
        while (!signal.aborted && !isInventoryFull(character)) {
            try {
                const res = await gather(characterName);
                console.log(res);
                character = res.character;

                const dropStr = res.details.items
                    .map( i => `${i.code} x${i.quantity}`)
                    .join(', ');


                log(`👇 Gathered successfully! Gained: ${dropStr}`, 'success', characterName);
                log(`🌟 ${res.details.xp} XP gained.`, 'success', characterName);

                await sleep(characterName, res.cooldown.total_seconds*1000, signal);

            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") {
                    log("Loop stopped.", 'warn', characterName);
                    return;
                }
                log(getApiErrorMessage(err), "error", characterName);
            }
        }

        const workshopMove = await moveTo(character, workshopLocation);
        if (workshopMove) character = workshopMove;

            const rawItem = findItem(character.inventory, rawCode);
            if (rawItem) {
                try {
                    const quantity = Math.floor(rawItem.quantity / craftRatio);
                    const craftRes = await craftItem(characterName, productCode, quantity);
                    character = craftRes.character;
                    log(`👇 Crafted successfully! ${productCode} x${quantity}`, 'success', characterName);

                    await sleep(characterName, craftRes.cooldown.total_seconds*1000, signal);
                } catch (err) {
                    if (err instanceof DOMException && err.name === "AbortError") {
                        log("Loop stopped.", 'warn', characterName);
                        break;
                    }
                    log(getApiErrorMessage(err), "error", characterName);
                    break;
                }

            }

    }

}