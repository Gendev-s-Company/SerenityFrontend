import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "../api";
import { BillingEntity } from "@/types/entity-type/billingEntity";
import { CustomerEntity } from "@/types/entity-type/customerEntity";

const invoicePath = "/bill";

export const getAllInvoice = async (company:string) => {
  return await getCall<BillingEntity[]>(invoicePath+'/all?company='+company);
}

// 
export const getPaginateBillings = async (company:string,page:number,size:number) => {
  return await getCall<Page<BillingEntity>>(`${invoicePath}/all/${page}/${size}?company=${company}&field=billingDate` );
}

export const getPaginateInvoices = async (company:string,page:number,size:number) => {
  return await getCall<Page<BillingEntity>>(`${invoicePath}/all/${page}/${size}?company=${company}` );
}

// Recupere la facture d'un client
export const getCustomerInvoices = async (customerid: string,company:string,page:number,size:number) => {
    return await getCall<Page<BillingEntity>>(`${invoicePath}/customers/get/${customerid}/${page}/${size}?company=${company}`);
}

// Recupere la liste tous les clients qui ont deja été facturé
export const getBilledCustomers =async (company:string,page:number,size:number) => {
    return await getCall<Page<CustomerEntity>>(`${invoicePath}/customers/${page}/${size}?company=${company}`);
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

