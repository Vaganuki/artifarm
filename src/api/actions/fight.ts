import {client} from "../artifactsApi.ts";
import type {ActionResultLike, FightActionResponse} from "../../@types/action";
import {applyActionResult} from "../../store/applyActionResult.ts";
import type {Character} from "../../@types/character";

export async function fight(characterName: string) {
    const {data} = await client.post<FightActionResponse>(
        `/my/${characterName}/action/fight`
    );
    const result : ActionResultLike = {};
    for (const character of data.data.characters) {
        result.character = character;
    }
    applyActionResult(result);
    return data.data;
}