import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { getAllItems } from "../api/items";
import {setItems, getItemsByCode, isItemsLoaded, subscribeItem} from "../store/itemsStore";
import type { Item } from "../@types/item";

interface ItemsContextValue {
    itemsByCode: Map<string, Item>;
    isLoading: boolean;
    error: string | null;
}

const ItemsContext = createContext<ItemsContextValue | null>(null);

export function ItemsProvider({ children }: { children: ReactNode }) {
    const itemsByCode = useSyncExternalStore(subscribeItem, getItemsByCode);
    const loaded = useSyncExternalStore(subscribeItem, isItemsLoaded);

    useEffect(() => {
        if (loaded) return;
        getAllItems()
            .then(setItems)
            .catch((err) => console.error("Failed to load items catalog:", err));
    }, [loaded]);

    return (
        <ItemsContext.Provider value={{ itemsByCode, isLoading: !loaded, error: null }}>
            {children}
        </ItemsContext.Provider>
    );
}

export function useItemsCache(): ItemsContextValue {
    const ctx = useContext(ItemsContext);
    if (!ctx) throw new Error("useItemsCache must be used within an ItemsProvider");
    return ctx;
}
