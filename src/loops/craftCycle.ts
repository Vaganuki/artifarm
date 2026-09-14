import { getCharacter } from "../api/characters";
import { moveTo } from "../utils/moveTo";
import { gather } from "../api/actions/gathering";
import { craftItem } from "../api/actions/craft";
import { depositExceptItem } from "../utils/bank";
import { isInventoryFull, findItem, findOtherItems } from "../utils/inventory";
import { sleep } from "../utils/sleep";
import { log } from "../lib/logger";
import type { Character } from "../@types/character";
import type {CraftCycleParams} from "../@types/craftCycle";

export async function craftCycle(params: CraftCycleParams, signal: AbortSignal): Promise<void> {
    const { characterName, gatherLocation, workshopLocation, rawCode, productCode, craftRatio } = params;

    let character: Character = await getCharacter(characterName);

    while (!signal.aborted) {
        if (findOtherItems(character.inventory, rawCode) || isInventoryFull(character)) {
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
                        .map((i) => `${i.quantity}x ${i.code}`)
                        .join(", ");

                    log(`Gathered successfully! Gained: ${dropsStr}`, "success", characterName);
                    log(`${result.details.xp} XP gained.`, "info", characterName);

                    await sleep(result.cooldown.total_seconds * 1000, signal);
                } catch (err) {
                    if (err instanceof DOMException && err.name === "AbortError") throw err;
                    log(err instanceof Error ? err.message : String(err), "error", characterName);
                    break;
                }
            }

            const workshopMove = await moveTo(character, workshopLocation);
            if (workshopMove) character = workshopMove;

            const rawItem = findItem(character.inventory, rawCode);
            if (rawItem) {
                try {
                    const quantity = Math.floor(rawItem.quantity / craftRatio);
                    const result = await craftItem(characterName, productCode, quantity);
                    character = result.character;
                    log(`Crafted ${productCode} x${quantity}`, "success", characterName);
                    await sleep(result.cooldown.total_seconds * 1000, signal);
                } catch (err) {
                    if (err instanceof DOMException && err.name === "AbortError") throw err;
                    log(err instanceof Error ? err.message : String(err), "error", characterName);
                    break;
                }
            }

            character = await depositExceptItem(character, rawCode, signal);
        } catch (err) {
            if (err instanceof DOMException && err.name === "AbortError") {
                log("Loop stopped.", "warn", characterName);
                return;
            }
            log(err instanceof Error ? err.message : String(err), "error", characterName);
            break;
        }
    }
}
