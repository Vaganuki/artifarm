export interface LogEntry {
    id: number;
    timestamp: number;
    character?: string;
    level: "info" | "success" | "warn" | "error";
    message: string;
}