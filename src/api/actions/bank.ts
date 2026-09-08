import {client} from "../artifactsApi.ts";
import type {BankDepositResponse, DepositPayloadItem} from "../../@types/action";
import {applyActionResult} from "../../store/applyActionResult.ts";

export async function depositItem(characterName: string, items: DepositPayloadItem[]) {
    const {data} = await client.post<BankDepositResponse>(
        `/my/${characterName}/action/bank/deposit/item`,
        items
    );
    applyActionResult(data.data);
    return data.data;
}