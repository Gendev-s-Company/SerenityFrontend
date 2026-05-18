import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { DishOrderEntity } from "@/types/entity-type/dishOrderEntity";

const stateOption: FieldOptions[] = [
  { id: '0', label: 'En cours' },
  { id: '1', label: 'Fini' },
  { id: '2', label: 'Payé en totalité' },
  { id: '3', label: 'Annulé' },
]

export const DishOrderColumnOptions: ColumnConfig<DishOrderEntity>[]=[
    { key: "select", header: "Select", type: "checkbox" },
    { key: "orderID", header: "OrderID", 
        sorting: true,
    },
    { key: "tableOccupation.table.name", 
      header: "Table Occupation",
      type: "link",
      sorting: true,    
      href: (row) => `/view/restaurant/dishOrder/dishOrderDetails?orderID=${row.orderID}` 
    },
    { key: "totalPrice", header: "Total Price", sorting: true },
    { key: "dateOrder", header: "Date Order", type: "date", sorting: true},
    { key: "stateLabel", header: "Etat", type: "text", sorting: true },

];

export const DishOrderNameField: FieldConfig<DishOrderEntity>[]=[
    {name:"totalPrice", libelle:"Prix total", type:"number", normal:true},
    {name:"dateOrder", libelle:"Date de commande", type:"date", normal:true},
    {name:"state", libelle:"Etat ", type: "select", normal: false, items: stateOption},
];

export const stateLabel: Record<number, string> = {
  0: "En cours",
  1: "Fini",
  2: "Payé en totalité",
  3: "Annulé",
};