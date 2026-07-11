import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "../api";
import { BillingEntity } from "@/types/entity-type/billingEntity";

const invoicePath = "/invoice";

export const getAllInvoice = async (company:string) => {
  return await getCall<BillingEntity[]>(invoicePath+'/all?company='+company);
}
export const getPaginateInvoice = async (company:string,page:number,size:number) => {
  return await getCall<Page<BillingEntity>>(`${invoicePath}/all/${page}/${size}?company=${company}` );
}
export const getPackById = async (id: string) => {
    return await getCall<BillingEntity>(`${invoicePath}/${id}`);
}
export const createInvoice = async (invoice: BillingEntity) => {
    return await postCall<BillingEntity>(invoicePath,invoice);
}

export const updateInvoice = async (invoice: BillingEntity) => {
    return await putCall<BillingEntity>(`${invoicePath}/update/${invoice.billID}`,invoice);
}
export const deleteInvoice = async (id: string) => {
    return await deleteCall<BillingEntity>(`${invoicePath}/${id}`);
}