import {useSyncExternalStore} from "react";
import {getCharacter, subscribe} from "../store/characterStore.ts";

export function useCharacter(name: string){
    return useSyncExternalStore(subscribe, ()=> getCharacter(name));
}