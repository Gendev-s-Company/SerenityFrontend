import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { PackEntity } from "@/types/entity-type/packEntity";

export const PackColumnOptions: ColumnConfig<PackEntity>[]=[
    { key: "select", header: "Select", type: "checkbox" },
    { key: "packID", header: "packID", sorting: true },
    { key: "title", header: "Titre du pack", sorting: true },
    { key: "discount", header: "Reduction", sorting: true },
    { key: "startDate", header: "Date début", type:"datetime", sorting: true },
    { key: "endDate", header: "Date fin", type:"datetime", sorting: true },
    { key: "status", header: "Statut", sorting: true },
];
export const PackNameField: FieldConfig<PackEntity>[] =[
    { name: "title", libelle: "Titre", type: "text",normal:true },
    { name: "discount", libelle: "Réduction", type: "number",normal:true },
    { name: "startDate", libelle: "Date début", type: "datetime-local",normal:true },
    { name: "endDate", libelle: "Date fin", type: "datetime-local",normal:true },
];
