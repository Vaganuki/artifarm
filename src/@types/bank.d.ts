import type {Cooldown} from "./action";
import type {Character} from "./character";

export interface BankDetail {
    slots: number;
    expansions: number;
    next_expansion_cost: number;
    gold: number;
}

export interface BankItem {
    code: string;
    quantity: number;
}

export interface BankItemsResponse {
    data: BankItem[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

// === ACTIONS ===

// Deposit
export interface DepositPayloadItem {
    code: string;
    quantity: number;
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

// Withdraw
export interface WithdrawPayloadItem {
    code: string;
    quantity: number;
}

export interface BankWithdrawDetails {
    cooldown: Cooldown;
    items: BankItem[];
    bank: BankItem[];
    character: Character;

}

export interface BankWithdrawResponse {
    data: BankWithdrawDetails;
}
