import {isAxiosError} from "axios";

export function getApiErrorMessage(err: unknown): string {
    if (isAxiosError(err)) {
        const apiMessage = err.response?.data?.error?.message;
        if (apiMessage) return apiMessage;
        return err.message;
    }
    if (err instanceof Error) return err.message;
    return String(err);
}