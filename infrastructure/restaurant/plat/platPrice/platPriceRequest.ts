import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { PlatPriceEntity } from "@/types/entity-type/platPriceEntity";

const platPricePath="/restaurant/dish/price"

export const getAllplatPrice = async (plat:string) => {
  return await getCall<PlatPriceEntity[]>(platPricePath+'/byplat?platid='+plat );
}

export const getPaginateplatPrices = async (plat:string,page:number,size:number) => {
  return await getCall<Page<PlatPriceEntity>>(`${platPricePath}/bydish/${page}/${size}?dishid=${plat}&field=dateChanged&sort=desc` );
}


export const getplatPriceById = async (id: string) => {
    return await getCall<PlatPriceEntity>(`${platPricePath}/${id}`);
}

export const createplatPrice = async (platPrice: PlatPriceEntity) => {
    return await postCall<PlatPriceEntity>(platPricePath, platPrice);
}

export const updateplatPrice = async (platPrice: PlatPriceEntity) => {
    return await putCall<PlatPriceEntity>(`${platPricePath}/${platPrice.priceID}`, platPrice);
}

export const deleteplatPrice = async (id: string) => {
    return await deleteCall<PlatPriceEntity>(`${platPricePath}/${id}`);
}


export const getplatLastPriceById = async (id: string) => {
    return await getCall<PlatPriceEntity>(`${platPricePath}/lastPrice?dishid=${id}`);
}
