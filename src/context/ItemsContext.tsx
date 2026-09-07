import type {Item} from "../@types/item";
import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import {getAllItems} from "../api/items.ts";

interface ItemsContextValue {
    itemsByCode: Map<string, Item>;
    isLoading: boolean;
    error: string | null;
}

const ItemsContext = createContext<ItemsContextValue | null>(null);

export function ItemsProvider({children}: {children: ReactNode}) {
    const [itemsByCode, setItemsByCode] = useState<Map<string, Item>>(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
        getAllItems()
            .then((items) => {
                const map = new Map(items.map((item) => [item.code, item]));
                setItemsByCode(map);
            })
            .catch((err) => setError(err instanceof Error ? err.message:'Unknown error occurred.'))
            .finally(() => setIsLoading(false));
    },[]);
    return (
        <ItemsContext.Provider value={{itemsByCode, isLoading, error}}>
            {children}
        </ItemsContext.Provider>
    );
}

export function useItemsCache() : ItemsContextValue {
    const ctx = useContext(ItemsContext);
    if(!ctx) throw new Error("useItemsCache must be used within an ItemsProvider");
    return ctx;
}