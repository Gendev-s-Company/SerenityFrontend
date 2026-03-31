import { FieldOptions } from "@/types/component-type/form-type";
import { TableTypeEntity } from "@/types/entity-type/tableTypeEntity";

export const convertListToOption = (list: TableTypeEntity[]): FieldOptions[] => {
    const result: FieldOptions[] = []
    list?.map((row) => {
        if (row.tabletypeid) {
            result.push({ id: row.tabletypeid, label: row.name })
        }
    }
    )
    return result;
};