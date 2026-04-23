import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { PlatEntity } from "@/types/entity-type/platEntity";

export const PlatColumnOptions: ColumnConfig<PlatEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/roomType/${row.dishID}`},
    { key: "dishID", header: "Dishid", sorting: true },
    { key: "name", header: "Name", type: "text", sorting: true },
    // { key: "typeid.name", header: "Type", type: "text", sorting: true },
    { key: "description", header: "description", type: "text", sorting: true },
];
export const PlatNamefield: FieldConfig<PlatEntity>[] = [
    { name: "name", libelle: "name:", type: "text", normal: true },
    { name: "description", libelle: "description :", type: "textarea", normal: false },
      
];