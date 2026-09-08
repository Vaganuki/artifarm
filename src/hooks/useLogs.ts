import {useSyncExternalStore} from "react";
import {getSnapshot, subscribe} from "../lib/logger.ts";

export function useLogs(){
    return useSyncExternalStore(subscribe, getSnapshot);
}