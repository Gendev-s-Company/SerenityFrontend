import { CompanyEntity } from "./companyEntity";
import { PackActivityDetailsEntity } from "./packActivityDetailsEntity";
import { PackHotelDetailsEntity } from "./packHotelDetailsEntity";
import { PackeRestoDetailsEntity } from "./packRestoDetailsEntity";

export interface PackEntity{
    packID: string |null,
    companyID : string,
    title: string,
    discount: number,
    startDate: Date,
    endDate: Date,
    status:number,
    activityPack?: PackActivityDetailsEntity[];
    hotelsPack?: PackHotelDetailsEntity[];
    restoPack?: PackeRestoDetailsEntity[];
    duration?:number,
    quantity?:number,
    skipValidation: boolean,
}