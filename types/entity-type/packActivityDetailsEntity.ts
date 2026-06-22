import { ActivityEntity } from "./activityEntity";
import { PackEntity } from "./packEntity";

export interface PackActivityDetailsEntity{
    id: string | null,
    pack?: PackEntity,
    activityID: string,
    duration: number,
    status: number,
    skipValidation: boolean,

}