import { ActivityOrderEntity, ActivitySearchedField} from "@/types/entity-type/activityorderEntity";
import { deleteCall, getCall, postCall, putCall } from "../../api";
import { Page } from "@/types/entity-type/common/Page";

const activityOrderPath = "/hotel/activityorder";

// export const getPaginateActivityOrder = async (page:number,size:number,id:string) => {
//   return await getCall<Page<ActivityOrderEntity>>(`${activityOrderPath}/byActivity/${page}/${size}?activityId=${id}`);
// }

export const getPaginateActivityOrder = async (page:number,size:number) => {
  return await getCall<Page<ActivityOrderEntity>>(`${activityOrderPath}/byActivity/${page}/${size}`);
}

function createDateQuery(body: ActivitySearchedField) {
  if (body.start && body.end) {
    return `&start=${body.start}&end=${body.end}`
  }else if (body.start && !body.end) {
    return `&start=${body.start}`
  }else if (!body.start && body.end) {
    return `&end=${body.end}`
  }
  return ""
}
function createpriceQuery(body: ActivitySearchedField) {
  if (body.min && body.max) {
    return `&min_price=${body.min}&max_price=${body.max}`
  }else if (body.min && !body.max) {
    return `&min_price=${body.min}`
  }else if (!body.min && body.max) {
    return `&max_price=${body.max}`
  }
  return ""
}
export const advancedSearchActivityOrder = async (page:number, size:number, company:string, state:number,body:ActivitySearchedField) => {
  let query = `?company=${company}&field=dateOrder&sort=desc&state=${state}`
  query+=createDateQuery(body)
  query+=createpriceQuery(body)
  query+= body.customer ? `&customer=${body.customer}` : ''
  return await getCall<Page<ActivityOrderEntity>>(`${activityOrderPath}/search/${page}/${size}${query}`);
}

export const getPaginateActivityOrderByCompany = async (page:number,size:number,companyId:string, state: string) => {
  return await getCall<Page<ActivityOrderEntity>>(`${activityOrderPath}/byState/${page}/${size}?company=${companyId}&field=dateOrder&sort=desc&state=${state}`);
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



