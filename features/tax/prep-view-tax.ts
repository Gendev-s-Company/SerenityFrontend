import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { TaxEntity } from "@/types/entity-type/taxEntity";

export const TaxColumnOptions : ColumnConfig<TaxEntity>[]=[
    { key: "select", header: "Select", type: "checkbox" },
    { key: "taxID", header: "taxID", sorting: true },
    { key: "company.name", header: "Companie", sorting: true },
    { key: "taxRate", header: "Taux", sorting: true },
    { key: "dateTax", header: "Date de parution", sorting: true },
    { key: "status", header: "Etat", sorting: true },
];

export const TaxNameField :FieldConfig<TaxEntity>[]=[
    {name:"taxRate", libelle:"Taux(en %)",type:"number" , normal:true},
    {name:"dateTax", libelle:"Date de parution",type:"date" , normal:true},
];