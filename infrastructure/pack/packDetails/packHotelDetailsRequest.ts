import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { PackHotelDetailsEntity } from "@/types/entity-type/packHotelDetailsEntity";

const packHotelDetailsPath = "/pack/hotel";

export const getAllPackHotel = async (id:string) => {
  return await getCall<PackHotelDetailsEntity[]>(`${packHotelDetailsPath}/byOrder?packid=${id}`);
}
export const getPaginatePackHotel = async (id:string,page:number,size:number) => {
  return await getCall<Page<PackHotelDetailsEntity>>(`${packHotelDetailsPath}/${page}/${size}?packid=${id}` );
}
export const getPackHotelById = async (id: string) => {
    return await getCall<PackHotelDetailsEntity>(`${packHotelDetailsPath}/${id}`);
}
export const createPackHotel = async (packHotel: PackHotelDetailsEntity) => {
    return await postCall<PackHotelDetailsEntity>(packHotelDetailsPath,packHotel);
}

export const updatePackHotel = async (packHotel: PackHotelDetailsEntity) => {
    return await putCall<PackHotelDetailsEntity>(`${packHotelDetailsPath}/${packHotel.id}`,packHotel);
}
export const deletePackHotel = async (id: string) => {
    return await deleteCall<PackHotelDetailsEntity>(`${packHotelDetailsPath}/${id}`);
}