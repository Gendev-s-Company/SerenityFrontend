import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { RestaurantTableEntity } from "@/types/entity-type/restauranTableEntity";

export const RestaurantTableColumnOptions: ColumnConfig<RestaurantTableEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" },
    { key: "tableID", header: "tableID", sorting: true },
    {
        key: "name",
        header: "Nom",
        href: (row) => `/view/restaurant/table/details?tableID=${row.tableID}`,
        type:'link',
        sorting: true
    },
    { key: "description", header: "Description", sorting: true },
    { key: "capacity", header: "Capacité", sorting: true },
    { key: "tabletype.name", header: "Type de table", sorting: true },
    { key: "status", header: "Statut", sorting: true },
];
export const RestaurantTableNameField: FieldConfig<RestaurantTableEntity>[] = [
    { name: "name", libelle: "Nom", type: "text", normal: true },
    { name: "description", libelle: "Description", type: "text", normal: true },
    { name: "capacity", libelle: "Capacité", type: "number", normal: true },
    { name: "status", libelle: "Statut", type: "number", normal: false }
];