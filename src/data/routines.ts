import * as L from "./locations";
import { rawResourceCycle } from "../loops/rawResourceCycle";
import { craftCycle } from "../loops/craftCycle";
import { combatCycle } from "../loops/combatCycle";

export type RoutineCategory = "resource" | "craft" | "combat";

export interface Routine {
    id: string;
    label: string;
    category: RoutineCategory;
    run: (characterName: string, signal: AbortSignal) => Promise<void>;
}

export const ROUTINES: Routine[] = [

    // === MINERALS ===
    {
        id: "copper_ore",
        label: "Copper Ore",
        category: "resource",
        run: (name, signal) => rawResourceCycle(name, L.COPPER_ROCKS, signal),
    },
    {
        id: "copper_bar",
        label: "Copper Bar",
        category: "craft",
        run: (name, signal) => craftCycle({
            characterName: name, gatherLocation: L.COPPER_ROCKS, workshopLocation: L.MINING_WORKSHOP,
            rawCode: "copper_ore", productCode: "copper_bar", craftRatio: 10,
        }, signal),
    },
    {
        id: "iron_ore",
        label: "Iron Ore",
        category: "resource",
        run: (name, signal) => rawResourceCycle(name, L.IRON_ROCKS, signal),
    },
    {
        id: "iron_bar",
        label: "Iron Bar",
        category: "craft",
        run: (name, signal) => craftCycle({
            characterName: name, gatherLocation: L.IRON_ROCKS, workshopLocation: L.MINING_WORKSHOP,
            rawCode: "iron_ore", productCode: "iron_bar", craftRatio: 10,
        }, signal),
    },

    // === WOODS ===
    {
        id: "ash_wood",
        label: "Ash Wood",
        category: "resource",
        run: (name, signal) => rawResourceCycle(name, L.ASH_TREE, signal),
    },
    {
        id: "ash_plank",
        label: "Ash Plank",
        category: "craft",
        run: (name, signal) => craftCycle({
            characterName: name, gatherLocation: L.ASH_TREE, workshopLocation: L.WOODCUTTING_WORKSHOP,
            rawCode: "ash_wood", productCode: "ash_plank", craftRatio: 10,
        }, signal),
    },
    {
        id: "spruce_wood",
        label: "Spruce Wood",
        category: "resource",
        run: (name, signal) => rawResourceCycle(name, L.SPRUCE_TREE, signal),
    },
    {
        id: "spruce_plank",
        label: "Spruce Plank",
        category: "craft",
        run: (name, signal) => craftCycle({
            characterName: name, gatherLocation: L.SPRUCE_TREE, workshopLocation: L.WOODCUTTING_WORKSHOP,
            rawCode: "spruce_wood", productCode: "spruce_plank", craftRatio: 10,
        }, signal),
    },
    {
        id: "birch_wood",
        label: "Birch Wood",
        category: "resource",
        run: (name, signal) => rawResourceCycle(name, L.BIRCH_TREE, signal),
    },

    // === FISH ===
    {
        id: "gudgeon",
        label: "gudgeon",
        category: "resource",
        run: (name, signal) => rawResourceCycle(name, L.GUDGEON_SPOT, signal),
    },
    {
        id: "cooked_gudgeon",
        label: "Cooked gudgeon",
        category: "craft",
        run: (name, signal) => craftCycle({
            characterName: name, gatherLocation: L.GUDGEON_SPOT, workshopLocation: L.COOKING_WORKSHOP,
            rawCode: "gudgeon", productCode: "cooked_gudgeon", craftRatio: 1,
        }, signal),
    },
    {
        id: "shrimp",
        label: "shrimp",
        category: "resource",
        run: (name, signal) => rawResourceCycle(name, L.SHRIMP_SPOT, signal),
    },
    {
        id: "cooked_shrimp",
        label: "Cooked Shrimp",
        category: "craft",
        run: (name, signal) => craftCycle({
            characterName: name, gatherLocation: L.SHRIMP_SPOT, workshopLocation: L.COOKING_WORKSHOP,
            rawCode: "shrimp", productCode: "cooked_shrimp", craftRatio: 1,
        }, signal),
    },
    {
        id: "trout",
        label: "trout",
        category: "resource",
        run: (name, signal) => rawResourceCycle(name, L.TROUT_SPOT, signal),
    },
    {
        id: "cooked_trout",
        label: "Cooked Trout",
        category: "craft",
        run: (name, signal) => craftCycle({
            characterName: name, gatherLocation: L.TROUT_SPOT, workshopLocation: L.COOKING_WORKSHOP,
            rawCode: "trout", productCode: "cooked_trout", craftRatio: 1,
        }, signal),
    },

    // === ALCHEMY ===
    {
        id: "sunflower",
        label: "Sunflower",
        category: "resource",
        run: (name, signal) => rawResourceCycle(name, L.SUNFLOWER, signal),
    },

    // === MONSTERS ===
    { id: "chicken", label: "Chicken", category: "combat", run: (name, signal) => combatCycle(name, L.CHICKEN, signal) },
    { id: "sheep", label: "Sheep", category: "combat", run: (name, signal) => combatCycle(name, L.SHEEP, signal) },
    { id: "cow", label: "Cow", category: "combat", run: (name, signal) => combatCycle(name, L.COW, signal) },

    { id: "yellow_slime", label: "Yellow Slime", category: "combat", run: (name, signal) => combatCycle(name, L.YELLOW_SLIMES, signal) },
    { id: "green_slime", label: "Green Slime", category: "combat", run: (name, signal) => combatCycle(name, L.GREEN_SLIMES, signal) },
    { id: "red_slime", label: "Red Slime", category: "combat", run: (name, signal) => combatCycle(name, L.RED_SLIMES, signal) },
    { id: "blue_slime", label: "Blue Slime", category: "combat", run: (name, signal) => combatCycle(name, L.BLUE_SLIMES, signal) },

    { id: "mushmush", label: "Mushmush", category: "combat", run: (name, signal) => combatCycle(name, L.MUSHMUSH, signal) },
    { id: "flying_snake", label: "Flying Snake", category: "combat", run: (name, signal) => combatCycle(name, L.DRAGON_FLY, signal) },
    { id: "wolf", label: "Wolf", category: "combat", run: (name, signal) => combatCycle(name, L.WOLF, signal) },
    { id: "highwayman", label: "Highway Man", category: "combat", run: (name, signal) => combatCycle(name, L.HIGHWAYMAN, signal) },
];
