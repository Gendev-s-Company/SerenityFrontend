import { RoomTypeEntity } from "@/types/entity-type/roomTypeEntity";
import { deleteCall, getCall, postCall, putCall} from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";

const roomTypePath="/hotel/room/type"

export const getAllRoomType = async (company:string) => {
  return await getCall<RoomTypeEntity[]>(roomTypePath+'/all?company='+company );
}

export const getPaginateRoomTypes = async (company:string,page:number,size:number) => {
  return await getCall<Page<RoomTypeEntity>>(`${roomTypePath}/all/${page}/${size}?company=${company}` );
}

export const getRoomTypeById = async (id: string) => {
    return await getCall<RoomTypeEntity>(`${roomTypePath}/${id}`);
}

export const createRoomType = async (roomType: RoomTypeEntity) => {
    return await postCall<RoomTypeEntity>(roomTypePath, roomType);
}

export const updateRoomType = async (roomType: RoomTypeEntity) => {
    return await putCall<RoomTypeEntity>(`${roomTypePath}/${roomType.typeID}`, roomType);
}

export const deleteRoomType = async (id: string) => {
    return await deleteCall<RoomTypeEntity>(`${roomTypePath}/${id}`);
}