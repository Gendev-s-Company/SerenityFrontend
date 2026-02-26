import { RoomEntity } from "@/types/entity-type/roomEntity";
import { deleteCall, getCall, postCall, putCall} from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";

const roomPath="/hotel/room"

export const getAllRoom = async () => {
  return await getCall<RoomEntity[]>(roomPath+'/all');
}

export const getPaginateRooms = async (page:number,size:number) => {
  return await getCall<Page<RoomEntity>>(`${roomPath}/${page}/${size}` );
}

export const getRoomById = async (id: string) => {
    return await getCall<RoomEntity>(`${roomPath}/${id}`);
}

export const createRoom = async (room: RoomEntity) => {
    return await postCall<RoomEntity>(roomPath, room);
}

export const updateRoom = async (room: RoomEntity) => {
    return await putCall<RoomEntity>(`${roomPath}/${room.roomID}`, room);
}

export const deleteRoom = async (id: string) => {
    return await deleteCall<RoomEntity>(`${roomPath}/${id}`);
}