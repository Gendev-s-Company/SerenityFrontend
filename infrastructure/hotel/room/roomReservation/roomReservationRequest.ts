import { deleteCall, getCall, postCall, putCall} from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { RoomReservationEntity } from "@/types/entity-type/roomReservationEntity";

const roomreservation="/hotel/room/reservation"

export const getAllReservation = async (companyId : string) => {
  return await getCall<RoomReservationEntity[]>(`${roomreservation}/avalaible?company=${companyId}`);
}

export const updateReservation = async (room: RoomReservationEntity) => {
    return await putCall<RoomReservationEntity>(`${roomreservation}/update/state/${room.reservationID}?state=1`, room);
}

export const getPaginateAllReservation = async (page:number,size:number,companyId:string, state: string) => {
  return await getCall<Page<RoomReservationEntity>>(`${roomreservation}/avalaible/${page}/${size}?state=${state}&start=2026-03-13T10:00:00&end=2026-03-13T10:00:00&company=${companyId}`);
}


// export const getPaginateAllReservation = async (page:number,size:number,companyId:string, state: string, startdate: string, enddate: string) => {

//   const now = new Date();
//   const pad = (n: number) => n.toString().padStart(2, '0');

//   const formattedDate = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

//   console.log(formattedDate); // Affiche "15/03/2026T20:57:xx"

//   return await getCall<Page<RoomReservationEntity>>(`${roomreservation}/avalaible/${page}/${size}?state=${state}&start=${startdate}&end=${formattedDate}&company=${companyId}`);
// }


// export const getPaginateAllReservation = async (page:number,size:number,companyId:string, state: string, startdate: string, enddate: string) => {

//   return await getCall<Page<RoomReservationEntity>>(`${roomreservation}/avalaible/${page}/${size}?state=${state}&start=${startdate}&end=${enddate}&company=${companyId}`);
// }