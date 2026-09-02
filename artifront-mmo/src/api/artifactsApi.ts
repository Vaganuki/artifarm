import * as axios from "axios";

const API_BASE = 'https://api.artifactsmmo.com';
const TOKEN = import.meta.env.ARTIFACTS_TOKEN

export const client = axios.create({
    baseURL: API_BASE,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
    },
});