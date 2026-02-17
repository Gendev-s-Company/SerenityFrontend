import { ActivityEntity } from "./activityEntity";

export interface ActivityPriceEntity {
    priceID: string | null,
    activity: ActivityEntity,
    hourPrice: number,
    price: number,
    dateChanged:Date,
    status: number,
    skipValidation: boolean,
}