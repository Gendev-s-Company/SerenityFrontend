import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { TableTypeEntity } from "@/types/entity-type/tableTypeEntity";

export const TableTypeColumnOptions: ColumnConfig<TableTypeEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/roomType/${row.tabletypeid}`},
    { key: "tabletypeid", header: "tabletypeid", sorting: true },
    { key: "company.name", header: "Société", type:'text', sorting: true },
    { key: "name", header: "Type de chambre", type: "text", sorting: true },
    { key: "description", header: "description", type: "text", sorting: true },
];
export const TableTypeNamefield: FieldConfig<TableTypeEntity>[] = [
    { name: "name", libelle: "Type de chambre:", type: "text", normal: true },
    { name: "description", libelle: "description :", type: "textarea", normal: false },
      
];