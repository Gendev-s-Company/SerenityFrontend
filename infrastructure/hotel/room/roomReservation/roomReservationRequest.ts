import { deleteCall, getCall, postCall, putCall} from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { RoomReservationEntity } from "@/types/entity-type/roomReservationEntity";

const roomreservation="/hotel/room/reservation"

export const getAllReservation = async (companyId : string) => {
  return await getCall<RoomReservationEntity[]>(`${roomreservation}/avalaible?company=${companyId}`);
}

// export const updateReservation = async (room: RoomReservationEntity) => {
//     return await putCall<RoomReservationEntity>(`${roomreservation}/update/state/${room.reservationID}?state=1`, room);
// }


export const updateReservation = async (room: RoomReservationEntity, state: string) => {
    return await putCall<RoomReservationEntity>(`${roomreservation}/update/state/${room.reservationID}?state=${state}`, room);
}


// export const getPaginateAllReservation = async (page:number,size:number,companyId:string, state: string, startdate: string, enddate: string) => {

//     const finalState = state === "-1" ? "1,2,3,7" : state; 

//   return await getCall<Page<RoomReservationEntity>>(`${roomreservation}/avalaible/${page}/${size}?state=${finalState}&start=2026-01-01T10:00:00&end=2026-12-13T10:00:00&company=${companyId}`);
// }



export const getPaginateAllReservation = async (page:number,size:number,companyId:string, state: string, startdate: string, enddate: string) => {

  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');

  const formattedEndDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  console.log(formattedEndDate);

  

  const firstDayOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0);

  const formattedStartDate = `${firstDayOfYear.getFullYear()}-${pad(firstDayOfYear.getMonth() + 1)}-${pad(firstDayOfYear.getDate())}T${pad(firstDayOfYear.getHours())}:${pad(firstDayOfYear.getMinutes())}:${pad(firstDayOfYear.getSeconds())}`;

  console.log(formattedStartDate);

  let finalStart = startdate === "" ? formattedStartDate : startdate;
  let finalEnd = enddate === "" ? formattedEndDate : enddate;

    const finalState = state === "-1" ? "1,2,3,7" : state; 

  return await getCall<Page<RoomReservationEntity>>(`${roomreservation}/avalaible/${page}/${size}?state=${finalState}&start=${finalStart}&end=${finalEnd}&company=${companyId}`);
}

