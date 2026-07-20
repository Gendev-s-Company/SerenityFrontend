import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "../api";
import { BillingEntity } from "@/types/entity-type/billingEntity";

const invoicePath = "/bill";

export const getAllInvoice = async (company:string) => {
  return await getCall<BillingEntity[]>(invoicePath+'/all?company='+company);
}

// Recupere la liste tous les clients qui ont deja été facturé
export const getPaginateCustomerInvoiced = async (company:string,page:number,size:number) => {
  return await getCall<Page<BillingEntity>>(`${invoicePath}/all/${page}/${size}?company=${company}&field=billingDate` );
}

export const getPaginateInvoices = async (company:string,page:number,size:number) => {
  return await getCall<Page<BillingEntity>>(`${invoicePath}/all/${page}/${size}?company=${company}` );
}

// Recupere la facture d'un client
export const getCustomerInvoice = async (customerid: string,company:string,page:number,size:number) => {
    return await getCall<BillingEntity>(`/customers/get/${customerid}/${page}/${size}?company=${company}`);
}
export const createInvoice = async (invoice: BillingEntity) => {
    return await postCall<BillingEntity>(invoicePath,invoice);
}

// Changement d'etat d'une facture client
export const updateInvoiceState = async (invoice: BillingEntity,state: number) => {
    return await putCall<BillingEntity>(`${invoicePath}/state/${invoice.billID}?state=${state}`,invoice);
}

export const updateInvoice = async (invoice: BillingEntity) => {
    return await putCall<BillingEntity>(`${invoicePath}/update/${invoice.billID}`,invoice);
}
export const deleteInvoice = async (id: string) => {
    return await deleteCall<BillingEntity>(`${invoicePath}/${id}`);
}

