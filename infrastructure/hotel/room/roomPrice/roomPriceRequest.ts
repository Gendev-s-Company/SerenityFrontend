import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { RoomPriceEntity } from "@/types/entity-type/roomPriceEntity";

const roomPricePath="/hotel/room/price"

export const getAllRoomPrice = async (room:string) => {
  return await getCall<RoomPriceEntity[]>(roomPricePath+'/byroom?roomid='+room );
}

export const getPaginateRoomPrices = async (room:string,page:number,size:number) => {
  return await getCall<Page<RoomPriceEntity>>(`${roomPricePath}/byroom/${page}/${size}?roomid=${room}&field=datechanged&sort=desc` );
}


export const getRoomPriceById = async (id: string) => {
    return await getCall<RoomPriceEntity>(`${roomPricePath}/${id}`);
}

export const createRoomPrice = async (roomPrice: RoomPriceEntity) => {
    return await postCall<RoomPriceEntity>(roomPricePath, roomPrice);
}

export const updateRoomPrice = async (roomPrice: RoomPriceEntity) => {
    return await putCall<RoomPriceEntity>(`${roomPricePath}/${roomPrice.priceID}`, roomPrice);
}

export const deleteRoomPrice = async (id: string) => {
    return await deleteCall<RoomPriceEntity>(`${roomPricePath}/${id}`);
}


export const getRoomLastPriceById = async (id: string) => {
    return await getCall<RoomPriceEntity>(`${roomPricePath}/lastPrice?roomid=${id}`);
}
