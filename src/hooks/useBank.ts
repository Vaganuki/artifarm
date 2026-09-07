import {useItemsCache} from "../context/ItemsContext.tsx";
import type {Item} from "../@types/item";
import {useCallback, useEffect, useState} from "react";
import type {BankItem} from "../@types/bank";
import {getBankItems} from "../api/bank.ts";

export interface EnrichedBankItem {
    code: string;
    quantity: number;
    item: Item | undefined;
}

export function useBank() {
    const {itemsByCode, isLoading : itemsLoading} = useItemsCache();
    const [rawItems, setRawItems] = useState<BankItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try{
            setError(null);
            setRawItems(await getBankItems());
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unknown error occurred.");
        } finally {
            setLoading(false);
        }

    }, []);

    useEffect(()=> {
        refresh();
    }, [refresh]);

    const enrichedItems: EnrichedBankItem[] = rawItems.map((bankItem) => ({
        ...bankItem,
        item: itemsByCode.get(bankItem.code),
    }));

    return {
        items: enrichedItems,
        isLoading: loading || itemsLoading,
        error,
        refresh,
    }
}