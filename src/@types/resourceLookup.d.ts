import type {Location} from "./location";

export interface ResolvedProcess {
    rawCode: string;
    productCode: string;
    workshopLocation : Location;
}