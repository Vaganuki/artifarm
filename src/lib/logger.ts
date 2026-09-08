import type {LogEntry} from "../@types/log";

type Listener = () => void;

let logs: LogEntry[] = [];
let nextId = 0;
const listeners = new Set<Listener>();
const MAX_LOGS = 500;

function emitChange() {
    listeners.forEach(listener => listener());
}

export function log (message: string, level: LogEntry['level'] = "info", character?:string) {
    logs = [...logs, {
        id: nextId++,
        timestamp: Date.now(),
        character,
        level,
        message
    }].slice(-MAX_LOGS);
    emitChange();
}

export function subscribe(listener: Listener) : () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function getSnapshot(): LogEntry[] {
    return logs;
}

export function clearLogs(){
    logs = [];
    emitChange();
}