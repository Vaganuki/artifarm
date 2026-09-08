import {client} from "../artifactsApi.ts";
import type {MoveActionResponse} from "../../@types/action";

export async function moveAction(characterName: string, x: number, y: number) {
    const {data} = await client.post<MoveActionResponse>(
        `my/${characterName}/action/move`,
        {x,y}
    );
    return data.data;
}