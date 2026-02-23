import { CustomerEntity } from "@/types/entity-type/customerEntity";
import { deleteCall, getCall, postCall, putCall } from "../../api";
import { Page } from "@/types/entity-type/common/Page";

const customerPath = "/customer";

// export const getAllCustomer = async (company:string) => {
//   return await getCall<CustomerEntity[]>(customerPath+'/all?company='+company );
// }

export const getAllCustomer = async () => {
  return await getCall<CustomerEntity[]>(customerPath);
}

// export const getAllCustomer = async (page:number,size:number) => {
//   return await getCall<Page<CustomerEntity>>(`${customerPath}/${page}/${size}` );
// }