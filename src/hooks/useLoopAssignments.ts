import {useSyncExternalStore} from "react";
import {getAssignments, subscribe} from "../lib/loopManager.ts";

export function useLoopAssignments(): Record<string, string>{
    return useSyncExternalStore(subscribe, getAssignments)
}