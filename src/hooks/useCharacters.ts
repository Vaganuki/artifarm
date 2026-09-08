import {useCallback, useEffect, useState, useSyncExternalStore} from "react";
import {getCharacters} from "../api/characters.ts";
import {getAllCharacters, setCharacters, subscribe} from "../store/characterStore.ts";

export function useCharacters() {
    const characters = useSyncExternalStore(subscribe, getAllCharacters);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const refresh = useCallback(async () => {
        try{
            setError(null);
            setCharacters(await getCharacters());
        } catch (e) {
            setError(e instanceof Error ? e.message : "Unknown error");
        } finally {
            setIsLoading(false)
        }
    },[]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { characters, isLoading, error , refresh };
}