import type {LoopInfo} from "../@types/loopManager";

type Listener = () => void;

const loops = new Map<string, LoopInfo>();
const listeners = new Set<Listener>();

let snapshot: Record<string, string> = {};

function rebuildSnapshot() {
    snapshot = {};
    loops.forEach((info,name) => {
        snapshot[name] = info.routineId;
    });
}

function emitChange() {
    listeners.forEach(listener => listener());
}

export function startLoop(
    characterName: string,
    routineId: string,
    runner: (signal: AbortSignal) => Promise<void>
) {
    if (loops.has(characterName)) {
        throw new Error(`A loop is already running for ${characterName}`);
    }
    const controller = new AbortController();
    loops.set(characterName, {controller, routineId});
    rebuildSnapshot();
    emitChange();

    runner(controller.signal).finally(() => {
        loops.delete(characterName);
        rebuildSnapshot();
        emitChange();
    });
}

export function stopLoop(characterName: string): void {
    loops.get(characterName)?.controller.abort();
}

export function isLoopRunning(characterName:string) : boolean {
    return loops.has(characterName);
}

export function getRunningRoutineId(characterName: string) : string | null {
    return loops.get(characterName)?.routineId ?? null;
}

export function getAssignments(): Record<string,string> {
    return snapshot;
}

export function subscribe(listener: Listener) : () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}