import {useSyncExternalStore} from "react";
import {getRunningRoutineId, subscribe} from "../lib/loopManager.ts";

export function useCurrentRoutine(characterName: string): string | null {
    return useSyncExternalStore(subscribe, ()=> getRunningRoutineId(characterName));
}