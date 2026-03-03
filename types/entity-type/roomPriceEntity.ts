
export interface RoomPriceEntity {
    priceID: string|null,
    roomID:string,
    nightPrice: number,
    hourPrice:number,
    datechanged: Date,
    accountRate:number,
    status: number,
    skipValidation: boolean,
}
