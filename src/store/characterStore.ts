import type {Character} from "../@types/character";

type Listener = () => void;

const listeners = new Set<Listener>();

const characters = new Map<string, Character>();
let snapshot: Character[] = [];


function rebuildSnapshot() {
    snapshot = Array.from(characters.values());
}

function emitChange() {
    listeners.forEach( l => l());
}

export function setCharacter(character: Character) {
    characters.set(character.name, character);
    rebuildSnapshot();
    emitChange();
}

export function setCharacters(chars: Character[]) {
    chars.forEach((c) => characters.set(c.name,c));
    rebuildSnapshot();
    emitChange();
}

export function getCharacter(name: string) : Character | undefined {
    return characters.get(name);
}

export function getAllCharacters() : Character[] {
    return snapshot;
}

export function subscribeCharacter(listener: Listener) : () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}