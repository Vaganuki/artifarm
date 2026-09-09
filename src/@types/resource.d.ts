export interface ResourceDrop {
    code: string;
    rate: number;
    min_quantity: number;
    max_quantity: number;
}

export interface ResourceSchema {
    name: string;
    code: string;
    skill: string;
    level: number;
    drops: ResourceDrop[];
}

export interface ResourceResponse {
    data: ResourceSchema;
}