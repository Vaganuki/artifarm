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