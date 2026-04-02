import { TableTypeEntity } from "@/types/entity-type/tableTypeEntity";
import { deleteCall, getCall, postCall, putCall} from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";

const tableTypePath="/restaurant/tabletype"

export const getAllTableType = async (company:string) => {
  return await getCall<TableTypeEntity[]>(tableTypePath+'/all?company='+company );
}

export const getPaginateTableTypes = async (company:string,page:number,size:number) => {
  return await getCall<Page<TableTypeEntity>>(`${tableTypePath}/all/${page}/${size}?company=${company}` );
}

export const getTableTypeById = async (id: string) => {
    return await getCall<TableTypeEntity>(`${tableTypePath}/${id}`);
}

export const createTableType = async (TableType: TableTypeEntity) => {
    return await postCall<TableTypeEntity>(tableTypePath, TableType);
}

export const updateTableType = async (TableType: TableTypeEntity) => {
    return await putCall<TableTypeEntity>(`${tableTypePath}/${TableType.tabletypeid}`, TableType);
}

export const deleteTableType = async (id: string) => {
    return await deleteCall<TableTypeEntity>(`${tableTypePath}/${id}`);
}

