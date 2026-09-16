import type {Item} from "../@types/item";

type Listener = () => void;

const listeners = new Set<Listener>();

let itemsByCode = new Map<string, Item>();
let loaded = false;

function emitChange() {
    listeners.forEach((listener) => listener());
}

export function setItems(items: Item[]) {
    itemsByCode = new Map(items.map( i => [i.code, i]));
    loaded = true;
    emitChange();
}

export function getItemsByCode() : Map<string, Item> {
    return itemsByCode;
}

export function isItemsLoaded() : boolean {
    return loaded;
}

export function subscribeItem(listener : Listener) : () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}