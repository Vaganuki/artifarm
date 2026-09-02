export interface CharacterEffect {
    code: string;
    value: number;
}

export interface CharacterInventoryItem {
    slot: number;
    code: string;
    quantity: number;
}

export interface Character {

    name: string;
    account: string;
    skin: string;
    level: number;
    xp:number;
    max_xp:number;
    gold:number;
    speed:number;

    // Professions
    mining_level:number; //Mining
    mining_xp:number;
    mining_max_xp:number;
    woodcutting_level:number; // Wood cutting
    woodcutting_xp:number;
    woodcutting_max_xp:number;
    fishing_level:number; // Fishing
    fishing_xp:number;
    fishing_max_xp:number;
    weaponcrafting_level:number; // Weapon Crafting
    weaponcrafting_xp:number;
    weaponcrafting_max_xp:number;
    gearcrafting_level:number; // Gear crafting
    gearcrafting_xp:number;
    gearcrafting_max_xp:number;
    jewelrycrafting_level:number; // Jewelry crafting
    jewelrycrafting_xp:number;
    jewelrycrafting_max_xp:number;
    cooking_level:number; // Cooking
    cooking_xp:number;
    cooking_max_xp:number;
    alchemy_level:number; // Alchemy
    alchemy_xp:number;
    alchemy_max_xp:number;

    // Combat stats
    hp:number;
    max_hp:number;
    haste:number;
    critical_strike: number; // % of critical strike
    wisdom: number; // 10 wisdom = 1% extra XP while fighting
    prospecting: number; // 10 prospecting = 1% extra chances of drop while fighting
    initiative: number;
    threat: number;
    attack_fire: number;
    attack_earth: number;
    attack_water: number;
    attack_air: number;
    dmg: number;
    dmg_fire: number;
    dmg_earth: number;
    dmg_water: number;
    dmg_air: number;
    res_fire: number;
    res_earth: number;
    res_water: number;
    res_air: number;
    effects: CharacterEffect[];

    // Map & Cooldown
    x: number;
    y: number;
    layer: string;
    map_id: number;
    cooldown: number;
    cooldown_expiration: string;

    // Equipement
    weapon_slot: string;
    rune_slot: string;
    shield_slot: string;
    helmet_slot: string;
    body_armor_slot: string;
    leg_armor_slot: string;
    boots_slot: string;
    ring1_slot: string;
    ring2_slot: string;
    amulet_slot: string;
    artifact1_slot: string;
    artifact2_slot: string;
    artifact3_slot: string;
    utility1_slot: string;
    utility1_slot_quantity: number;
    utility2_slot: string;
    utility2_slot_quantity: number;
    bag_slot: string;

    // Tasks
    task: string;
    task_type: string;
    task_progress: number;
    task_total: number;

    // Inventory
    inventory_max_items: number;
    inventory: CharacterInventoryItem[];
}

export interface CharacterResponse {
    data: Character;
}