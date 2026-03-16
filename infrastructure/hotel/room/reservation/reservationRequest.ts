import { RoomEntity } from "@/types/entity-type/roomEntity";
import { deleteCall, getCall, postCall, putCall} from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { ResaValidator, ResaValidatorResult } from "@/types/entity-type/reservationEntity";

const resaPath="/hotel/room/reservation"

export const finalisationResa = async (body: ResaValidator) => {
  return await postCall<ResaValidatorResult>(resaPath+'/validateInitResa', body);
}