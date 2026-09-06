import type {Character, CharacterResponse, CharactersResponse} from "../@types/character";
import {client} from "./artifactsApi.ts";

export async function getCharacters(): Promise<Character[]> {
    const {data} = await client.get<CharactersResponse>('/my/characters');
    return data.data;
}

export async function getCharacter(name: string): Promise<Character> {
    const {data} = await client.get<CharacterResponse>(`/characters/${name}`);
    return data.data;
}