import { ActivityOrderEntity} from "@/types/entity-type/activityorderEntity";
import { deleteCall, getCall, postCall, putCall } from "../../api";
import { Page } from "@/types/entity-type/common/Page";

const activityOrderPath = "/hotel";

export const getPaginateActivityOrder = async (page:number,size:number) => {
  return await getCall<Page<ActivityOrderEntity>>(`${activityOrderPath}/byActivity/${page}/${size}`);
}
export const getFindAllByCompany = async (id: string) => {
    return await getCall<ActivityOrderEntity[]>(`${activityOrderPath}/byActivity?companyId=${id}`);
}
export const getPaginateModelByCustomerr = async (page:number,size:number) => {
  return await getCall<Page<ActivityOrderEntity>>(`${activityOrderPath}/bycustomer/${page}/${size}`);
}
export const createActivityOrder= async (activityOrder: ActivityOrderEntity) => {
    return await postCall<ActivityOrderEntity>(activityOrderPath, activityOrder);
}
export const updateActivityOrder = async (activityOrder: ActivityOrderEntity) => {
    return await putCall<ActivityOrderEntity>(`${activityOrderPath}/${activityOrder.acOrderID}`, activityOrder);
}
export const deleteActivityOrder = async (id: string) => {
    return await deleteCall<ActivityOrderEntity>(`${activityOrderPath}/${id}`);
}



