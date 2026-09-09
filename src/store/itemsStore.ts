import type {Item} from "../@types/item";

type Listener = () => void;

let itemsByCode= new Map<string, Item>();
let loaded = false;
const listeners = new Set<Listener>();

function emitChange() {
    listeners.forEach((listener) => listener());
}

export function setItems(items: Item[]) {
    itemsByCode = new Map(items.map(item => [item.code, item]));
    loaded = true;
    emitChange();
}
export function getItemsByCode() : Map<string,Item> {
    return itemsByCode;
}
export function isItemsLoaded() : boolean {
    return loaded;
}

export function subscribe(listener : Listener) : () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}