import { RoomEntity } from "@/types/entity-type/roomEntity";
import { deleteCall, getCall, postCall, putCall} from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { ResaValidator, ResaValidatorResult, ReservationEntity } from "@/types/entity-type/reservationEntity";

const resaPath="/hotel/room/reservation"

export const finalisationResa = async (body: ResaValidator) => {
  return await postCall<ResaValidatorResult>(resaPath+'/validateInitResa', body);
}

export const createReservation = async (body: ReservationEntity) => {
  return await postCall<ReservationEntity>(resaPath, body);
}
