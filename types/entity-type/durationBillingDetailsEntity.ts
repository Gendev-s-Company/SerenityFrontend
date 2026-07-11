export interface DurationBillingDetailsEntity {
    durationBillingDetailsID: string | null,
    servicename:string,
    unitPrice: number,
    type:string,
    startime: Date,
    endtime: Date,
}