import {useCallback, useEffect, useState, useSyncExternalStore} from "react";
import {getBankItems, setBankItems, subscribeBank} from "../store/bankStore.ts";
import {useItemsCache} from "../context/ItemsContext.tsx";
import {getBankItems as fetchBankItems} from '../api/bank.ts'


export function useBank() {
    const rawItems = useSyncExternalStore(subscribeBank, getBankItems);
    const {itemsByCode, isLoading:itemsLoading} = useItemsCache();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try {
            setError(null);
            setBankItems(await fetchBankItems());
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unknow error');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const items = rawItems.map((bankItem) => ({
        ...bankItem,
        item: itemsByCode.get(bankItem.code),
    }));

    return {items, isLoading: isLoading || itemsLoading, error, refresh};
}