import * as axios from "axios";

const API_BASE = 'https://api.artifactsmmo.com';

let currentToken: string | null = null;

export function setApiToken(token: string | null) {
    currentToken = token;
}

export const client = axios.create({
    baseURL: API_BASE,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use((config) => {
    if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new CustomEvent('artifacts:unauthorized'));
        }
        return Promise.reject(error);
    }
)

export async function fetchToken(username: string, password: string): Promise<string> {
    const credentials = btoa(`${username}:${password}`);
    const res = await client.post<{ token: string }>('/token',
            {},
            {
                headers: {
                    'Authorization' : `Basic ${credentials}`
                }
            }
        );
    return res.data.token;
}