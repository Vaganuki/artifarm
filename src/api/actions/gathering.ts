import type {GatheringActionResponse} from "../../@types/action";
import {client} from "../artifactsApi.ts";
import {applyActionResult} from "../../store/applyActionResult.ts";

export async function gather(characterName: string) {
    const {data} = await client.post<GatheringActionResponse>(
        `/my/${characterName}/action/gathering`
    );
    applyActionResult(data.data);
    return data.data
}