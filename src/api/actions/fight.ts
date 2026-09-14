import {client} from "../artifactsApi.ts";
import type {FightActionResponse} from "../../@types/action";
import {applyActionResult} from "../../store/applyActionResult.ts";

export async function fight(characterName: string) {
    const {data} = await client.post<FightActionResponse>(
        `/mym/${characterName}/action/fight`
    );
    applyActionResult(data.data);
    return data.data;
}