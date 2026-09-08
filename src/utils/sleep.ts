export function sleep(ms: number, signal?: AbortSignal) : Promise<void> {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(new DOMException("Aborted", "AbortError"));
            return;
        }

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