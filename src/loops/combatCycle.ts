import type {Location} from "../@types/location";
import {log} from "../lib/logger.ts";
import {getApiErrorMessage} from "../utils/apiError.ts";
import type {Character, CharacterInventoryItem} from "../@types/character";
import {getCharacter} from "../store/characterStore.ts";
import {getItemsByCode} from "../store/itemsStore.ts";
import {findHealingItem, findItem, grabHealingItem, isInventoryFull, useInvItem} from "../utils/inventory.ts";
import {depositItemExcept} from "../utils/bank.ts";
import {moveTo} from "../utils/moveTo.ts";
import {fight} from "../api/actions/fight.ts";
import {sleep} from "../utils/sleep.ts";

export async function combatCycle(
    characterName: string,
    location: Location,
    signal: AbortSignal,
): Promise<void> {
    try {
        let current : Character | undefined = getCharacter(characterName);
        if (!current) return;
        while (!signal.aborted) {
            log(`Begins a new combat cycle (${location.x}, ${location.y})`, "info", characterName);

            let healingReady = false;
            let healingItem: CharacterInventoryItem =  {slot: -1, code:'', quantity:-1};
            let healValue = 0;

            //getting heal items to go to war
            while (!healingReady && !signal.aborted) {
                const itemsByCode = getItemsByCode();
                console.log('inv before found healing:',current.inventory)
                const foundHealingItem = findHealingItem(current.inventory, itemsByCode);
                console.log('found healing:',foundHealingItem);

                if (foundHealingItem) {
                    healValue = foundHealingItem.effects[0].value
                    healingItem = findItem(current.inventory, foundHealingItem.code) ?? healingItem;
                } else {
                    console.log('in else:', current)
                    current = await grabHealingItem(current, signal);
                }

                if(healingItem.code !== '') {
                    if(current.max_hp - current.hp >= healValue && healingItem.quantity > 0) {
                        let useQuantity = Math.floor((current.max_hp - current.hp) / healValue);
                        useQuantity = Math.min(useQuantity, healingItem.quantity);

                        current = await useInvItem(current, healingItem.code, useQuantity, signal);
                        healingItem = {...healingItem, quantity: healingItem.quantity - useQuantity};
                    }

                    if (healingItem.quantity > 0) {
                        healingReady = true;
                    }
                }

            }

            if (isInventoryFull(current)) {
                current = await depositItemExcept(current, healingItem.code, signal)
            }

            const moveResult = await moveTo(current, location);
            if (moveResult) current = moveResult;
            let fightReady = true;

            while (fightReady && !signal.aborted) {
                const fightRes = await fight(current.name);
                current = fightRes.characters[0];

                const fightStats = fightRes.fight.characters[0];


                log(fightRes.fight.result === "win" ? "Fight won!" : "Fight lost!", fightRes.fight.result === "win" ? "success" : "error", current.name);
                log(`XP gained: ${fightStats.xp} | HP remaining: ${fightStats.final_hp}`, "info", current.name);

                if (fightStats.drops.length > 0) {
                    const dropsStr = fightStats.drops.map((d) => `${d.quantity}x ${d.code}`).join(", ");
                    log(`Loot dropped: ${dropsStr}`, "success", current.name);
                }
                await sleep(current.name, fightRes.cooldown.total_seconds*1000, signal);

                if(current.max_hp - current.hp >= healValue && healingItem.quantity > 0) {
                    let useQuantity = Math.floor((current.max_hp - current.hp) / healValue);
                    useQuantity = Math.min(useQuantity, healingItem.quantity);

                    current = await useInvItem(current, healingItem.code, useQuantity, signal);
                    healingItem = {...healingItem, quantity: healingItem.quantity - useQuantity};

                    if (healingItem.quantity === 0) fightReady = false;
                }

                if(isInventoryFull(current)) {
                    current = await depositItemExcept(current, healingItem.code, signal);
                    const backMove = await moveTo(current, location);
                    if(backMove) current = backMove;
                }

            }

        }
    } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
            log("Loop stopped.", 'warn', characterName);
        }
        log(getApiErrorMessage(err), "error", characterName);
        await sleep(characterName, 5000, signal)
    }
}