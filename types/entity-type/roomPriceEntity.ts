export interface RoomPriceEntity {
     priceID: string | null,
     roomID: string,
     nightPrice: number,
     hourPrice: number,
     dateChanged: Date,
     accountRate: number,
    skipValidation: boolean,
}