import { deleteCall, getCall, postCall, putCall} from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { ReservationTableEntity } from "@/types/entity-type/reservationTableEntity";
import { TableReservationEntity } from "@/types/entity-type/tableReservationEntity";

const tablereservation="/restaurant/table/occupation"

export const getAllReservation = async (companyId : string) => {
  return await getCall<TableReservationEntity[]>(`${tablereservation}/avalaible?company=${companyId}`);
}


export const updateReservation = async (table: TableReservationEntity, state: string) => {
    return await putCall<TableReservationEntity>(`${tablereservation}/update/state/${table.occupationID}?state=${state}`, table);
}




export const getPaginateAllReservation = async (page:number,size:number,companyId:string, state: string, startdate: string, enddate: string) => {

  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');

  const formattedEndDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  console.log(formattedEndDate);

  

  const firstDayOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0);

  const formattedStartDate = `${firstDayOfYear.getFullYear()}-${pad(firstDayOfYear.getMonth() + 1)}-${pad(firstDayOfYear.getDate())}T${pad(firstDayOfYear.getHours())}:${pad(firstDayOfYear.getMinutes())}:${pad(firstDayOfYear.getSeconds())}`;

  console.log(formattedStartDate);

  const finalStart = startdate === "" ? formattedStartDate : startdate;
  const finalEnd = enddate === "" ? "" : enddate;

    const finalState = state === "-1" ? "0,1,2" : (state === "-2" ? "4,5" : state); 

    // const finalState = state === "-1" ? "1,2,8" : (state === "-2" ? "4,5" : state);

  return await getCall<Page<TableReservationEntity>>(`${tablereservation}/avalaible/${page}/${size}?state=${finalState}&start=${finalStart}&end=${finalEnd}&company=${companyId}`);
}


export const createReservation = async (body: ReservationTableEntity) => {
  return await postCall<ReservationTableEntity>(tablereservation, body);
}

