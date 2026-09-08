type Listener = () => void;

const controllers = new Map<string, AbortController>();
const listeners = new Set<Listener>();

function emitChange() {
    listeners.forEach(listener => listener());
}

export function startLoop(characterName: string, runner: (signal: AbortSignal) => Promise<void>) {
    if (controllers.has(characterName)) {
        throw new Error(`A loop is already running for ${characterName}`);
    }
    const controller = new AbortController();
    controllers.set(characterName, controller);
    emitChange();

    runner(controller.signal).finally(() => {
        controllers.delete(characterName);
        emitChange();
    });
}

export function stopLoop(characterName: string): void {
    controllers.get(characterName)?.abort();
}

export function isLoopRunning(characterName:string) : boolean {
    return controllers.has(characterName);
}

export function subscribe(listener: Listener) : () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}