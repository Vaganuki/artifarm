import type {BankItem} from "../@types/bank";

type Listener = () => void;

let bankItems: BankItem[] = [];
const listeners = new Set<Listener>();

function emitChange() {
    listeners.forEach((listener) => listener());
}

export function setBankItems(items: BankItem[]) {
    bankItems = items;
    emitChange();
}

export function getBankItems() : BankItem[] {
    return bankItems;
}

export function subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}