import {client} from "../artifactsApi.ts";
import type {
    BankDepositResponse,
    BankWithdrawResponse,
    DepositPayloadItem,
    WithdrawPayloadItem
} from "../../@types/bank";
import {applyActionResult} from "../../store/applyActionResult.ts";

export async function depositItem(characterName: string, items: DepositPayloadItem[]) {
    const {data} = await client.post<BankDepositResponse>(
        `/my/${characterName}/action/bank/deposit/item`,
        items
    );
    applyActionResult(data.data);
    return data.data;
}

export async function withdrawItems(characterName: string, items: WithdrawPayloadItem[]) {
    const { data } = await client.post<BankWithdrawResponse>(
        `/my/${characterName}/action/bank/withdraw/item`,
        items
    );
    applyActionResult(data.data);
    return data.data;
}
