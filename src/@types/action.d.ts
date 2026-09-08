import type {Character} from "./character";

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
    character: Character;
}

export interface BankDepositResponse {
    data: BankDepositDetails;
}

export interface DepositPayloadItem {
    code: string;
    quantity: number;
}