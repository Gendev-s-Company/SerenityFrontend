import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall, apiCallImage, postCallImage } from "@/infrastructure/api";
import { RoomPhotoEntity } from "@/types/entity-type/roomPhotoEntity";

const roomPhotoPath="/hotel/room/photo"

export const getAllphoto = async (id: string,page:number,size:number) => {
    return await getCall<Page<RoomPhotoEntity>>(`${roomPhotoPath}/byRoom/${page}/${size}?roomid=${id}`);
}

export const createPhoto = async (room: unknown) => {
    return await postCallImage<unknown>(`${roomPhotoPath}/save`, room);
}

export const deleteRoomPhoto = async (id: string) => {
    return await deleteCall<RoomPhotoEntity>(`${roomPhotoPath}/${id}`);
}


