import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { TableTypeEntity } from "@/types/entity-type/tableTypeEntity";

export const TableTypeColumnOptions: ColumnConfig<TableTypeEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" },
    { key: "tabletypeid", header: "tabletypeid", sorting: true },
    { key: "name", header: "Nom",  sorting: true },
    { key: "description", header: "Description", sorting: true },
    { key: "status", header: "Statut", sorting: true },

];
export const TableTypeNameField: FieldConfig<TableTypeEntity>[] = [
    { name: "name", libelle: "Nom", type: "text",normal:true },
    { name: "description", libelle: "Description", type: "text", normal: true },
    {
        name: "status", libelle: "Statut", type: "number",
        normal: false
    },
];