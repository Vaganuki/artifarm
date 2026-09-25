import type {Item, ItemsResponse} from "../@types/item";
import {client} from "./artifactsApi.ts";
import {sleep} from "../utils/sleep.ts";

const PAGE_SIZE = 100;
export async function getAllItems(): Promise<Item[]> {

    const allItems : Item[] = []
    let page = 1;
    let totalPages = 1;

    do {
        const { data } = await client.get<ItemsResponse>("/items", {
            params: { page , size: PAGE_SIZE},
        });

        allItems.push(...data.data);
        totalPages = data.pages;
        page++;
        if (page <= totalPages) {
            await sleep('CONSOLE',250);
        }
    } while (page <= totalPages);


    return allItems;
}