import type {Location} from "../@types/location";

// === WORKSHOPS ===
export const BANK : Location = {x: 4, y: 1};
export const MINING_WORKSHOP : Location = {x: 1, y: 5};
export const WOODCUTTING_WORKSHOP : Location = {x: -2, y: -3};
export const COOKING_WORKSHOP : Location = {x: 1, y: 1};

// === MINES ===
export const COPPER_ROCKS : Location = {x: 2, y: 0};
export const IRON_ROCKS : Location = {x: 1, y: 7};

// === TREES ===
export const ASH_TREE : Location = {x: -1, y: 0};
export const SPRUCE_TREE : Location = {x: 2, y: 6};

// === FISHES ===
export const GUDGEON_SPOT : Location = {x: 4, y: 2};
export const SHRIMP_SPOT : Location = {x: 5, y: 2};

// === MONSTERS ===
export const CHICKEN : Location = {x: 0, y: 1};
export const YELLOW_SLIMES : Location = {x: 1, y: -2};
export const GREEN_SLIMES : Location = {x: 0, y: -1};
export const RED_SLIMES : Location = {x: 1, y: -1};
export const BLUE_SLIMES : Location = {x: 2, y: -1};
export const SHEEP : Location = {x: 5, y: 12};
export const COW : Location = {x: 0, y: 2};
export const MUSHMUSH : Location = {x: 5, y: 3};
export const DRAGON_FLY : Location = {x: 5, y: 4};

export const LOCATIONS = {
    BANK,
    MINING_WORKSHOP,
    WOODCUTTING_WORKSHOP,
    COOKING_WORKSHOP,
    COPPER_ROCKS,
    IRON_ROCKS,
    ASH_TREE,
    SPRUCE_TREE,
    GUDGEON_SPOT,
    SHRIMP_SPOT,
    CHICKEN,
    YELLOW_SLIMES,
    GREEN_SLIMES,
    RED_SLIMES,
    BLUE_SLIMES,
    SHEEP,
    COW,
    MUSHMUSH,
    DRAGON_FLY,
} as const;

export type LocationName = keyof typeof LOCATIONS;