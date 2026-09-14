import type {Location} from "../@types/location";
import type {Character, CharacterInventoryItem} from "../@types/character";
import {getCharacter} from "../api/characters.ts";
import {log} from "../lib/logger.ts";
import {getItemsByCode} from "../store/itemsStore.ts";
import {findHealingItem, findItem, isInventoryFull} from "../utils/inventory.ts";
import {moveTo} from "../utils/moveTo.ts";
import {sleep} from "../utils/sleep.ts";
import {depositExceptItem} from "../utils/bank.ts";
import {getHealingItem, healing} from "../utils/fighting.ts";
import {fight} from "../api/actions/fight.ts";

export async function combatCycle(
    characterName: string,
    location: Location,
    signal: AbortSignal,
): Promise<void> {
    try{
        let char: Character = await getCharacter(characterName);
        while(!signal.aborted) {
            log(`Begins a new combat cycle @ (${location.x}, ${location.y})`, 'info', characterName);
            let healingReady = false;
            let healingItem : CharacterInventoryItem = {
                slot: -1,
                code:'',
                quantity: -1,
            };
            let healValue = 0;

            while(!healingReady && !signal.aborted) {
                const itemsByCode = getItemsByCode();
                const foundHealingItem = findHealingItem(char.inventory, itemsByCode);

                if (foundHealingItem) {
                    healValue = foundHealingItem.effects[0].value;
                    healingItem = findItem(char.inventory, foundHealingItem.code) ?? healingItem;
                } else {
                    char = await getHealingItem(char, signal);
                }

                if (healingItem.code !== "") {
                    if (char.max_hp - healValue >= char.hp && healingItem.quantity > 0) {
                        let useQuantity = Math.floor((char.max_hp - char.hp) / healValue);
                        if (useQuantity > healingItem.quantity) useQuantity = healingItem.quantity;

                        char = await healing(char, healingItem.code, useQuantity, signal);
                        healingItem = {...healingItem, quantity: healingItem.quantity - useQuantity};
                    }

                    if (healingItem.quantity > 0) {
                        healingReady = true;
                    }
                }
            }

            const moveResult = await moveTo(char, location);
            if (moveResult) char = moveResult;

            let fightReady = true;

            while (fightReady && !signal.aborted) {
                try {
                    const result = await fight(characterName);
                    char = result.character;

                    const fightStats = result.fight.characters[0];

                    log(result.fight.result === "win" ? "Fight won !" : "Fight lost !", result.fight.result === "win" ? "success" : "error", characterName);
                    log(`XP gained : ${fightStats.xp} | HP remaining : ${fightStats.final_hp}`, "info", characterName);

                    if (fightStats.drops.length > 0) {
                        const dropStr= fightStats.drops.map( d => `${d.code} x${d.quantity}`);
                        log(`Loot droped: ${dropStr}`, 'success', characterName);
                    }

                    await sleep(result.cooldown.total_seconds * 1000, signal);

                    if (char.max_hp - healValue >= char.hp && healingItem.quantity > 0) {
                        let useQuantity = Math.floor((char.max_hp - char.hp) / healValue);
                        if (useQuantity > healingItem.quantity) useQuantity = healingItem.quantity;

                        char = await healing(char, healingItem.code, useQuantity, signal);

                        healingItem = {...healingItem, quantity: healingItem.quantity - useQuantity};
                        if (healingItem.quantity <= 0) fightReady = false;
                    }

                    if (isInventoryFull(char)) {
                        char = await depositExceptItem(char, healingItem.code, signal);
                        const backMove = await moveTo(char, location);
                        if (backMove) char = backMove;
                    }

                } catch(e) {
                    if (e instanceof DOMException && e.name === "AbortError") throw e;
                    log(e instanceof Error ? e.message : String(e), "error", characterName);
                    break;
                }
            }
        }
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            log("Loop stopped.", "warn", characterName);
            return;
        }
        log(error instanceof Error ? error.message : String(error), "error", characterName);
    }
}