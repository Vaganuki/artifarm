import {useCallback, useState} from "react";

const STORAGE_KEY = "artifacts_token";

export function useAuthCredentials() {
    const [accessToken, setAccessToken] = useState<string | null>(
        () => localStorage.getItem(STORAGE_KEY)
    );
    const [isPersisted, setIsPersisted] = useState<boolean>(
        () => localStorage.getItem(STORAGE_KEY) !== null,
    );

    const setToken = useCallback((newToken: string, remember: boolean) => {
        const trimmed = newToken.trim();
        if (!trimmed) return;
        if(remember) {
            localStorage.setItem(STORAGE_KEY, trimmed);
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }

        setIsPersisted(remember);
        setAccessToken(trimmed);
    }, []);

    const clearToken = useCallback(() => {
       localStorage.removeItem(STORAGE_KEY);
       setIsPersisted(false);
       setAccessToken(null);
    }, []);

    return {accessToken, isPersisted, setToken, clearToken};
}