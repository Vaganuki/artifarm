export interface BankDetail {
    slots: number;
    expansions: number;
    next_expansion_cost: number;
    gold: number;
}
export interface BankItem {
    data: BankItemData[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface BankItemData {
    code: string;
    quantity: number;
}