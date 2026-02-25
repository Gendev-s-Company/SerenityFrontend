import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { RoomEntity } from "@/types/entity-type/roomEntity";

const RoomPath="/hotel/room"



export const getRoomyById = async (id: string) => {
    return await getCall<RoomEntity>(`${RoomPath}/${id}`);
}

