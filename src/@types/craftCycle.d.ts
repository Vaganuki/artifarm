import type {Location} from "./location";
import type {Cooldown} from "./action";
import type {BankItem} from "./bank";
import type {Character} from "./character";

export interface CraftCycleParams {
    characterName: string;
    gatherLocation: Location;
    workshopLocation: Location;
    rawCode: string;
    productCode: string;
    craftRatio: number;
}

export interface CraftActionDetails {
    xp: number;
    items: BankItem[];
}

export interface CraftActionData {
    cooldown: Cooldown;
    details: CraftActionDetails;
    character: Character;
}

export interface CraftActionResponse {
    data: CraftActionData;
}