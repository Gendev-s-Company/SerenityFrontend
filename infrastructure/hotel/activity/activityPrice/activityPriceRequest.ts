import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { ActivityPriceEntity } from "@/types/entity-type/activityPriceEntity";

const activityPricePath="/hotel/activityPrice"

export const getAllActivityPrice = async (activity:string) => {
  return await getCall<ActivityPriceEntity[]>(activityPricePath+'/byActivity?activityid='+activity );
}

export const getPaginateActivityPrices = async (activity:string,page:number,size:number) => {
  return await getCall<Page<ActivityPriceEntity>>(`${activityPricePath}/byActivity/${page}/${size}?activityid=${activity}` );
}


export const getActivityPriceById = async (id: string) => {
    return await getCall<ActivityPriceEntity>(`${activityPricePath}/${id}`);
}

export const createActivityPrice = async (activityPrice: ActivityPriceEntity) => {
    return await postCall<ActivityPriceEntity>(activityPricePath, activityPrice);
}

export const updateActivityPrice = async (activityPrice: ActivityPriceEntity) => {
    return await putCall<ActivityPriceEntity>(`${activityPricePath}/${activityPrice.priceID}`, activityPrice);
}

export const deleteActivityPrice = async (id: string) => {
    return await deleteCall<ActivityPriceEntity>(`${activityPricePath}/${id}`);
}


export const getActivityLastPriceById = async (id: string) => {
    return await getCall<ActivityPriceEntity>(`${activityPricePath}/lastPrice?activityid=${id}`);
}
