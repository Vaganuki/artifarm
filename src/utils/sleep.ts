import {log} from "../lib/logger.ts";

export function sleep(characterName:string, ms: number, signal?: AbortSignal) : Promise<void> {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(new DOMException("Aborted", "AbortError"));
            return;
        }

        if(characterName!=="CONSOLE") log(`⏳ Cooldown stared for: ${ms/1000}s`, "info", characterName);
        const timeout = setTimeout(resolve, ms);

        signal?.addEventListener(
            "abort",
            () => {
                clearTimeout(timeout);
                reject(new DOMException("Aborted", "AbortError"));
            },
            {once: true}
        );
    });
}