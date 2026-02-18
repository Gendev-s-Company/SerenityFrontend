import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { ActivityOrderEntity } from "@/types/entity-type/activityorderEntity";
// column de la table
export const ActivityOrderColumnOptions: ColumnConfig<ActivityOrderEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" },
    { key: "acOrderID", header: "AcOrderID", sorting: true },
    { key: "activity.name", header: "Activité", type: "text", sorting: true },
    { key: "activity.description", header: "Description", type: "text", sorting: true },
    { key: "price", header: "Prix", type: "amount", sorting: true },
    { key: "duration", header: "Durée", type: "amount", sorting: true },
    { key: "dateOrder", header: "Date de commande", type: "date", sorting: true },
];


export const ActivityOrderfield: FieldConfig<ActivityOrderEntity>[] = [
    { name: "price", libelle: "Prix :", type: "amount", normal: true },
    { name: "duration", libelle: "Durée :", type: "amount", normal: true },
    { name: "dateOrder", libelle: "Date de commande :", type: "date", normal: true },
];