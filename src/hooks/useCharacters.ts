import {useCallback, useEffect, useState, useSyncExternalStore} from "react";
import {getAllCharacters, getCharacter, setCharacters, subscribeCharacter} from "../store/characterStore.ts";
import {getCharacters} from "../api/characters.ts";

export function useCharacter(name: string) {
    const getSnapshot = useCallback(() => getCharacter(name), [name]);
    return useSyncExternalStore(subscribeCharacter, getSnapshot);
}


export function useCharacters() {
    const characters = useSyncExternalStore(subscribeCharacter, getAllCharacters);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try{
            setError(null);
            setCharacters(await getCharacters());
        } catch(error){
            setError(error instanceof Error ? error.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    },[]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {characters, isLoading, error, refresh};
}
