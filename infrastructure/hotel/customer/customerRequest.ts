import { CustomerEntity } from "@/types/entity-type/customerEntity";
import { deleteCall, getCall, postCall, putCall } from "../../api";
import { Page } from "@/types/entity-type/common/Page";

const activityOrderPath = "/customer";

export const getAllCustomer = async (company:string) => {
  return await getCall<CustomerEntity[]>(activityOrderPath+'/all?company='+company );
}