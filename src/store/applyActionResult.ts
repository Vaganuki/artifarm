import type {ActionResultLike} from "../@types/action";
import {setCharacter} from "./characterStore.ts";
import {setBankItems} from "./bankStore.ts";

export function applyActionResult(result: ActionResultLike) {
    if (result.character) setCharacter(result.character);
    if (result.bank) setBankItems(result.bank);
}