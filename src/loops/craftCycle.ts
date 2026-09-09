import type {CraftCycleParams} from "../@types/craftCycle";
import type {Character} from "../@types/character";
import {getCharacter} from "../api/characters.ts";
import {findItem, findOtherItems, isInventoryFull} from "../utils/inventory.ts";
import {depositExceptItem} from "../utils/bank.ts";
import {moveTo} from "../utils/moveTo.ts";
import {gather} from "../api/actions/gathering.ts";
import {log} from "../lib/logger.ts";
import {sleep} from "../utils/sleep.ts";

export async function craftCycle(params: CraftCycleParams, signal: AbortSignal) : Promise<void> {
    const {characterName, gatherLocation, workshopLocation, rawCode, productCode, craftRatio} = params;

    let character: Character = await getCharacter(characterName);
    while (!signal.aborted) {
        if (findOtherItems(character.inventory, rawCode) || isInventoryFull(character)){
            character = await depositExceptItem(character, rawCode, signal);
        }

        try {
            const gatherMove = await moveTo(character, gatherLocation);
            if (gatherMove) character = gatherMove;

            while (!signal.aborted && !isInventoryFull(character)) {
                try {
                    const result = await gather(characterName);
                    character = result.character;

                    const dropsStr = result.details.items
                        .map(i => `${i.quantity} x${i.code}`)
                        .join(', ');

                    log(`Gathered successfully! Gained: ${dropsStr}`, "success", characterName);
                    log(`${result.details.xp} XP gained.`, "info", characterName);

                    await sleep(result.cooldown.total_seconds * 1000, signal);
                } catch (e) {
                    if (e instanceof DOMException && e.name === 'AbortError') throw e;
                    log(e instanceof Error ? e.message : String(e), 'error', character.name);
                    break;
                }
            }

            const workshopMove = await moveTo(character, workshopLocation);
            if (workshopMove) character = workshopMove;

            const rawItem = findItem(character.inventory, rawCode);
            if(rawItem) {
                try {
                    const result = await craftItem(characterName, productCode, quantity);
                    character = result.character;
                    log(`Crafted ${quantity}x ${productCode}`, "success", characterName);
                    await sleep(result.cooldown.total_seconds * 1000, signal);
                }
            }

        }
    }
}