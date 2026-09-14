import type {UseItemActionResponse} from "../../@types/action";
import {client} from "../artifactsApi.ts";
import {applyActionResult} from "../../store/applyActionResult.ts";

export async function useItem(characterName: string, code: string, quantity: number) {
    const {data} = await client.post<UseItemActionResponse>(
        `/my/${characterName}/action/use`,
        [{code, quantity}],
    );
    applyActionResult(data.data);
    return data.data;
}