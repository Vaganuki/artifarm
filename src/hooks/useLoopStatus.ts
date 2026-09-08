import {useSyncExternalStore} from "react";
import {isLoopRunning, subscribe} from "../lib/loopManager.ts";

export function useLoopStatus(characterName : string) : boolean {
    return useSyncExternalStore(subscribe, () => isLoopRunning(characterName));
}