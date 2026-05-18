import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { PlatTypeEntity } from "@/types/entity-type/platTypeEntity";

export const PlatTypeColumnOptions: ColumnConfig<PlatTypeEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/roomType/${row.typeID}`},
    { key: "typeID", header: "tabletypeid", sorting: true },
    { key: "company.name", header: "Société", type:'text', sorting: true },
    { key: "name", header: "Type de chambre", type: "text", sorting: true },
    { key: "description", header: "Description", type: "text", sorting: true },
];
export const PlatTypeNamefield: FieldConfig<PlatTypeEntity>[] = [
    { name: "name", libelle: "Type de plat:", type: "text", normal: true },
    { name: "description", libelle: "description :", type: "textarea", normal: false },
      
];