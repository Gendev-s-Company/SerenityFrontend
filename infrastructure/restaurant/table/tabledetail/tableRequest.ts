import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { TableEntity } from "@/types/entity-type/tableEntity";

const tablePath="/restaurant/table"


export const getTableById = async (id: string) => {
    return await getCall<TableEntity>(`${tablePath}/${id}`);
}