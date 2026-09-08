import {client} from "../artifactsApi.ts";
import type {BankDepositResponse, DepositPayloadItem} from "../../@types/action";

export async function depositItem(characterName: string, items: DepositPayloadItem[]) {
    const {data} = await client.post<BankDepositResponse>(
        `/my/${characterName}/action/bank/deposit/item`,
        items
    );
    return data.data;
}