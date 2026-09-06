import {useCallback, useState} from "react";

const STORAGE_KEY: string = 'artifacts_token';

export function useAuthToken() {
    const [token, setTokenState] = useState<string|null>(
        () => localStorage.getItem(STORAGE_KEY)
    );

    const [isPersisted, setIsPersisted] = useState<boolean>(
        () => localStorage.getItem(STORAGE_KEY) !== null
    );

    const setToken = useCallback((newToken: string, remember: boolean) => {
        const trimmed = newToken.trim();
        if (!trimmed) return;

        if (remember) {
            localStorage.setItem(STORAGE_KEY, trimmed);
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }

        setIsPersisted(remember)
        setTokenState(newToken);
    },[]);

    const clearToken = useCallback( ()=> {
        localStorage.removeItem(STORAGE_KEY);
        setTokenState(null);
        setIsPersisted(false)
    }, []);

    return {token, isPersisted, setToken, clearToken};
}