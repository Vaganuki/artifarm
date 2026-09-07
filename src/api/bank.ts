import type {BankItem, BankItemsResponse} from "../@types/bank";
import {client} from "./artifactsApi.ts";

export async function getBankItems(): Promise<BankItem[]> {
    const allItems: BankItem[] = [];
    let page = 1;
    let totalPages = 1;

    do{
        const { data }  = await client.get<BankItemsResponse>("/my/bank/items", {
            params: {page, size: 100},
        });

        allItems.push(...data.data);

        totalPages = data.pages;
        page++;

    } while (page <= totalPages);

    return allItems
}