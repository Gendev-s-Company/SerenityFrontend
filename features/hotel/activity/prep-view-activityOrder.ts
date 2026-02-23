import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { ActivityOrderEntity } from "@/types/entity-type/activityorderEntity";
// column de la table
export const ActivityOrderColumnOptions: ColumnConfig<ActivityOrderEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" },
    { key: "acOrderID", header: "AcOrderID", type: "text", sorting: true },
    { key: "activity.name", header: "Activité", type: "text", sorting: true },
    // { key: "activity.description", header: "Description", type: "text", sorting: true },
    { key: "customer.name", header: "Client", type: "text", sorting: true },
    { key: "price", header: "Prix", amountType: {currency:'MGA', lang:'fr'}, sorting: true },
    { key: "duration", header: "Durée en heure", type: "text", sorting: true },
    { key: "state", header: "Statut", type: "text", sorting: true },
    { key: "dateOrder", header: "Date de commande", type: "datetime", sorting: true },
];

const stateOption:FieldOptions[] = [
    {id: '0', label:'Encore non payé'},
    {id: '1', label:'Payé'},
]

export const ActivityOrderfield: FieldConfig<ActivityOrderEntity>[] = [
    { name: "price", libelle: "Prix :", type: "amount", normal: true },
    { name: "duration", libelle: "Durée :", type: "number", normal: true },
    { name: "state", libelle: "Statut :", type: "select", normal: false,items:stateOption },
    { name: "dateOrder", libelle: "Date de commande :", type: "datetime-local", normal: true },
];