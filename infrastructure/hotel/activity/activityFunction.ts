import { FieldOptions } from "@/types/component-type/form-type";
import { ActivityEntity } from "@/types/entity-type/activityEntity";

export const convertListToOptionActivity = (list: ActivityEntity[]): FieldOptions[] => {
    const result: FieldOptions[] = []
    list?.map((row) => {
        if (row.activityID) {
            result.push({ id: row.activityID, label: row.name })
        }
    }
    )
    return result;
}