import { FieldOptions } from "@/types/component-type/form-type";
import { UserEntity } from "@/types/entity-type/userEntity";

export const convertListUsersToOption = (list: UserEntity[]): FieldOptions[] => {
    const result: FieldOptions[] = []
    list?.map((row) => {
        if (row.userID) {
            result.push({ id: row.userID, label: row.name })
        }
    }
    )
    return result;
}