import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { TableTypeEntity } from "@/types/entity-type/tableTypeEntity";

const tableTypePath="/restaurant/tabletype"

export const getAllTableType = async (company:string) => {
  return await getCall<TableTypeEntity[]>(tableTypePath+'/all?company='+company );
}
export const getTableTypeById = async (id: string) => {
    return await getCall<TableTypeEntity>(`${tableTypePath}/${id}`);
}

export const getPaginateTableTypes = async (company:string,page:number,size:number) => {
  return await getCall<Page<TableTypeEntity>>(`${tableTypePath}/all/${page}/${size}?company=${company}` );
}

export const getTableTypeByCompany = async (company: string) => {
    return await getCall<TableTypeEntity[]>(`${tableTypePath}/all?company=${company}`);
}

export const createTabletype = async (tableType: TableTypeEntity) => {
    return await postCall<TableTypeEntity>(tableTypePath, tableType);
}

export const updateTableType = async (tableType: TableTypeEntity) => {    
    return await putCall<TableTypeEntity>(`${tableTypePath}/${tableType.tabletypeid}`, tableType);
}

export const deleteTableType = async (id: string) => {    
    return await deleteCall<TableTypeEntity>(`${tableTypePath}/${id}`);
}       