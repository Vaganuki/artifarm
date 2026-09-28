export type RoutineCategory = 'resource' | 'craft' | 'combat';

export interface Routine{
    id: string;
    label: string;
    category: RoutineCategory;
    run: (characterName: string, signal: AbortSignal) => Promise<void>;
}