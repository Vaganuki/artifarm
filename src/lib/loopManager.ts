const controllers = new Map<string, AbortController>();

export function startLoop(characterName: string, runner: (signal: AbortSignal) => Promise<void>) {
    if (controllers.has(characterName)) {
        throw new Error(`A loop is already running for ${characterName}`);
    }
    const controller = new AbortController();
    controllers.set(characterName, controller);

    runner(controller.signal).finally(() => {
        controllers.delete(characterName);
    });
}

export function stopLoop(characterName: string): void {
    controllers.get(characterName)?.abort();
}

export function isLoopRunning(characterName:string) : boolean {
    return controllers.has(characterName);
}