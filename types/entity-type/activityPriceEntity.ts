import { ActivityEntity } from "./activityEntity";

export interface ActivityPriceEntity {
    priceID: string | null,
    activity: ActivityEntity,
    hourPrice: number,
    price: number,
    datechanged:Date,
    status: number,
    skipValidation: boolean,
}