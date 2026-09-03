import {useCallback, useEffect, useState} from "react";
import type {Character} from "../@types/character";
import {getCharacters} from "../api/characters.ts";

export function useCharacters(pollIntervalMs? : number) {
    const [characters, setCharacters] = useState<Character[]>([])
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
        if(!pollIntervalMs) return;

        const interval = setInterval(refresh, pollIntervalMs);
        return () => clearInterval(interval);
    }, [refresh, pollIntervalMs]);

    return { characters, isLoading, error , refresh };
}