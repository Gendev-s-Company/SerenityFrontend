import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { DishOrderDetailsEntity } from "@/types/entity-type/dishOrderDetailsEntity";

const stateOption: FieldOptions[] = [
  { id: '0', label: 'En cours' },
  { id: '1', label: 'Fini' },
]


export const DishOrderDetailsColumnOption: ColumnConfig<DishOrderDetailsEntity>[]=[
    { key: "select", header: "Select", type: "checkbox" },
    { key: "orderDetailsID", header: "orderDetailsID", 
        type: "text", 
        sorting: true,
    },
    { key: "dish.name", header: "Nom du Plat", sorting: true },
    { key: "quantity", header: "Quantité", sorting: true },
    { key: "unitPrice", header: "Prix Unitaire", sorting: true },
    { key: "dateOrder", header: "Date/Heure de commande", type: "date", sorting: true},
    { key: "state", header: "Etat", sorting: true },
    { key: "status", header: "Statut", sorting: true },
]

export const DishOrderDetailsNameField: FieldConfig<DishOrderDetailsEntity>[]=[
    {name:"quantity", libelle:"Quantité", type:"number", normal:true},
    {name:"state", libelle:"Etat", type:"select", normal:false, items: stateOption},
];

export const stateLabel: Record<number, string> = {
  0: "En cours",
  1: "Terminé",
};