import type {Item, ItemsResponse} from "../@types/item";
import {client} from "./artifactsApi.ts";

const PAGE_SIZE = 524;
const allItems : Item[] = []


export async function getAllItems(): Promise<Item[]> {

    const { data } = await client.get<ItemsResponse>("/items", {
        params: {size: PAGE_SIZE},
    });

    allItems.push(...data.data);

    return allItems;
}