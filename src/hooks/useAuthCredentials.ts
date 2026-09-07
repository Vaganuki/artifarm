import {useCallback, useState} from "react";
import type {LogInResponse} from "../@types/account";

const STORAGE_KEY: string = 'artifacts_token';

interface LoginResult {
    success: boolean;
    error?: string;
}

export function useAuthCredentials() {
    const [token, setTokenState] = useState<string|null>(
        () => localStorage.getItem(STORAGE_KEY)
    );

    const [isPersisted, setIsPersisted] = useState<boolean>(
        () => localStorage.getItem(STORAGE_KEY) !== null
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = useCallback(async (username : string, password: string, remember: boolean): Promise<LoginResult> => {
        const trimmedUsername: string = username.trim();
        if (!trimmedUsername || !password) {
            return{success: false, error: 'Username or password required'};
        }

        setIsLoading(true);

        try{
            const response = await fetch('https://api.artifactsmmo.com/token', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', Authorization: `Basic ${btoa(trimmedUsername + ':' + password)}`},
                body: JSON.stringify({username: trimmedUsername, password}),
            });

            if (!response.ok) {
                const message = response.status === 401
                    ? 'Invalid Credentials'
                    : 'An error occurred, try again later';

                return {success: false, error: message};
            }

            const data : LogInResponse = await response.json();

            const jwt = data.token

            if(remember) {
                localStorage.setItem(STORAGE_KEY, jwt);
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
            if(isLoading) console.log(isLoading);
            setIsPersisted(remember);
            setTokenState(jwt);
            console.log(jwt)
            return {success: true}
        } catch {
            return {success: false, error: 'An error occurred'};
        } finally {
            setIsLoading(false);
        }

    }, []);

    const clearToken = useCallback( ()=> {
        localStorage.removeItem(STORAGE_KEY);
        setTokenState(null);
        setIsPersisted(false)
    }, []);

    return {token, isPersisted, login, clearToken};
}