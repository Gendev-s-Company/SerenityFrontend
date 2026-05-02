import { FieldOptions } from "@/types/component-type/form-type";
import { DishEntity } from "@/types/entity-type/dishEntity";
import { DishTypeEntity } from "@/types/entity-type/dishTypeEntity";

export const convertListToOption = (list: DishTypeEntity[]): FieldOptions[] => {
    return list?.flatMap(row =>
        row.dishes?.filter(dish => dish.dishID !== null).map(dish => ({
            id: dish.dishID!,
            label: dish.name
        })) || []
    ) || [];
};