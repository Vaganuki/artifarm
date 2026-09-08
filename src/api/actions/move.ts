import {client} from "../artifactsApi.ts";
import type {MoveActionResponse} from "../../@types/action";
import {applyActionResult} from "../../store/applyActionResult.ts";

export async function moveAction(characterName: string, x: number, y: number) {
    const {data} = await client.post<MoveActionResponse>(
        `my/${characterName}/action/move`,
        {x,y}
    );
    applyActionResult(data.data);
    return data.data;
}