export interface ItemCondition {
    code: string;
    operator: 'eq' | 'ne' | 'gt' | 'lt' | 'cost' | 'has_item' | 'achievement_unlocked';
    value: number;
}

export interface ItemEffects {
    code: string;
    value: number;
    description: string;
}

export interface CraftSchemaItem {
    code: string;
    quantity: number;
}

export interface CraftSchema {
    skill: 'weaponcrafting' | 'gearcrafting' | 'jewelrycrafting' | 'cooking' | 'woodcutting' | 'mining' | 'alchemy';
    level: number;
    items: CraftSchemaItem[];
    quantity: number;
}

export interface Item {
    name: string;
    code: string;
    level: number;
    type: string;
    subtype: string;
    description: string;
    conditions: ItemCondition[];
    effects: ItemEffects[];
    craft: CraftSchema[];
    tradeable: boolean;
    recyclable: boolean;
}

export interface ItemResponse {
    data: Item;
}