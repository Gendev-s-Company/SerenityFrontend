import { TaxEntity } from "@/types/entity-type/taxEntity";
import { deleteCall, getCall, postCall, putCall } from "../api";
import { Page } from "@/types/entity-type/common/Page";

const taxPath = "/tax";

export const getAllTaxes = async (company:string) => {
  return await getCall<TaxEntity[]>(taxPath+'/all?company='+company);
}

export const getPaginateTaxes = async (company:string, page:number, size:number) => {
    return await getCall<Page<TaxEntity>>(`${taxPath}/all/${page}/${size}?company=${company}&field=dateTax` );
}

export const createTax = async (tax: TaxEntity) => {
    return await postCall<TaxEntity>(taxPath,tax);
}

export const updateTax = async (tax: TaxEntity) => {
    return await putCall<TaxEntity>(`${taxPath}/${tax.taxID}`,tax);
}
export const deleteTax = async (id: string) => {
    return await deleteCall<TaxEntity>(`${taxPath}/${id}`);
}