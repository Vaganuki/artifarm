import type {Character} from "./character";
import type {BankItem} from "./bank";

export interface Cooldown {
    total_seconds: number;
    expiration: string;
}
export interface MoveDestination {
    x: number;
    y: number;
    name: string;
}
export interface MoveData {
    cooldown: Cooldown;
    destination: MoveDestination;
    character: Character
}

export interface MoveActionResponse {
    data: MoveData;
}

export interface GatheringItem {
    code: string;
    quantity: number;
}

export interface GatheringDetails {
    xp: number;
    items: GatheringItem[];
}

export interface GatheringData {
    cooldown: Cooldown;
    details: GatheringDetails;
    character: Character;
}

export interface GatheringActionResponse {
    data: GatheringData;
}

export interface BankDepositDetails {
    cooldown: Cooldown;
    items: BankItem[];
    bank: BankItem[];
    character: Character;

}

export interface BankDepositResponse {
    data: BankDepositDetails;
}

export interface DepositPayloadItem {
    code: string;
    quantity: number;
}

export interface ActionResultLike{
    character?: Character;
    bank?: BankItem[];
}