import type {Routine} from "../@types/routine";
import {MONSTER_LOCATIONS, RAW_RESOURCE_LOCATIONS} from "./locations.ts";
import {rawResourceCycle} from "../loops/rawResourceCycle.ts";
import type {Item} from "../@types/item";

const RESOURCE_ROUTINES: Routine[] = Object.entries(RAW_RESOURCE_LOCATIONS).map(([name,spot]) => ({
    id: `resource: ${name}`,
    label: name.replaceAll("_", " "),
    category:"resource",
    run: (characterName, signal) => rawResourceCycle(characterName, spot, signal),
}));

const COMBAT_ROUTINES: Routine[] = Object.entries(MONSTER_LOCATIONS).map(([name, spot]) => ({
    id: `combat: ${name}`,
    label: name.replaceAll("_", " "),
    category:"combat",
    run: (characterName, signal) => combatCycle(characterName, spot, signal),
}));

export function getCraftRoutines(itemsByCode: Map<string, Item>) : Routine[] {
    return Object.entries(RAW_RESOURCE_LOCATIONS)
        .filter(([,spot]) => resolveGatherAndCraft(spot, itemsByCode) !== null)
        .map(([name,spot]) => ({
            id: `craft: ${name}`,
            label: `${name.replaceAll("_", " ")} (gather & craft)`,
            category:"craft",
            run: (characterName, signal) => processResourceCycle(characterName, spot, signal),
        }));
}
export function getAllRoutines(itemsByCode: Map<string, Item>) : Routine[] {
    return [...RESOURCE_ROUTINES, ...getCraftRoutines(itemsByCode), ...OMBAT_ROUTINES];
}