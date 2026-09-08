import {useItemsCache} from "../context/ItemsContext.tsx";
import type {Item} from "../@types/item";
import {getBankItems as fetchBankItems} from '../api/bank';
import {useCallback, useEffect, useState, useSyncExternalStore} from "react";
import {getBankItems, setBankItems, subscribe} from "../store/bankStore.ts";

export interface EnrichedBankItem {
    code: string;
    quantity: number;
    item: Item | undefined;
}

export function useBank() {
    const rawItems = useSyncExternalStore(subscribe, getBankItems)
    const {itemsByCode, isLoading : itemsLoading} = useItemsCache();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try{
            setError(null);
            setBankItems(await fetchBankItems());
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