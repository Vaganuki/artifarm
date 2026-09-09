import type {CraftActionResponse} from "../../@types/craftCycle";
import {client} from "../artifactsApi.ts";
import {applyActionResult} from "../../store/applyActionResult.ts";

export async function craftItem(characterName: string, productCode: string, quantity: number) {
    const { data } = await client.post<CraftActionResponse>(
        `/my/${characterName}/action/crafting`,
        {productCode, quantity}
    );
    applyActionResult(data.data);
    return data.data;
}