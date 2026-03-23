import { DisponibilityEntity, RoomEntity } from "@/types/entity-type/roomEntity";
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

// hotel/room/avalaible?company=COMP000001&start=2026-03-11T00:00:00&end=2026-03-14T23:59:59&state=2&state=3&status=0&type=detail


export const getAllRoomAvalaible = async (company: string,state: number[] = [], start:string, end:string) => {
    let param = ''
    state.map((row) => {
        param += '&state='+row
    })

  return await getCall<RoomEntity[]>(`${roomPath}/avalaible?company=${company}&start=${start}&end=${end}${param}`);
}

export const getAllDisponibility = async (company: string,state: number[] = [], start:string, end:string,type:string|null) => {
    let param = ''
    state.map((row) => {
        param += '&state='+row
    })

  return await getCall<DisponibilityEntity[]>(`${roomPath}/avalaible?company=${company}&start=${start}&end=${end}${param}&type=${type}`);
}

