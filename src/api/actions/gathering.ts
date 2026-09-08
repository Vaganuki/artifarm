import type {GatheringActionResponse} from "../../@types/action";
import {client} from "../artifactsApi.ts";

export async function gather(characterName: string) {
    const {data} = await client.post<GatheringActionResponse>(
        `/my/${characterName}/action/gathering`
    );
    return data.data
}