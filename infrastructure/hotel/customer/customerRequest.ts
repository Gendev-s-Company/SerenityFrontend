import { CustomerEntity } from "@/types/entity-type/customerEntity";
import { deleteCall, getCall, postCall, putCall } from "../../api";
import { Page } from "@/types/entity-type/common/Page";

const customerPath = "/customer";

export const getAllCustomer = async (company:string) => {
  return await getCall<CustomerEntity[]>(`${customerPath}?company=${company}`);
}
export const getPaginateCustomers = async (company:string,page:number,size:number) => {
  return await getCall<Page<CustomerEntity>>(`${customerPath}/all/${page}/${size}?company=${company}` );
}

export const getCustomerById = async (id: string) => {
    return await getCall<CustomerEntity>(`${customerPath}/${id}`);
}

export const createCustomer = async (customer: CustomerEntity) => {
    return await postCall<CustomerEntity>(customerPath, customer);
}

export const updateCustomer = async (customer: CustomerEntity) => {
    return await putCall<CustomerEntity>(`${customerPath}/${customer.customerID}`, customer);
}

export const deleteCustomer = async (id: string) => {
    return await deleteCall<CustomerEntity>(`${customerPath}/${id}`);
}
