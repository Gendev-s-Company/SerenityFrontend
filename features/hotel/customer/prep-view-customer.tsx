import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { CustomerEntity } from "@/types/entity-type/customerEntity";
export const CustomerColumnOptions: ColumnConfig<CustomerEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/customer/${row.customerID}`},
    { key: "customerID", header: "customerID", sorting: true },
    { key: "name", header: "Nom", type:'text', sorting: true },
    { key: "phone", header: "Téléphone", type: "text", sorting: true },
    { key: "mail", header: "Email", type: "text", sorting: true },
    { key: "address", header: "Adresse", type: "text", sorting: true },

];
export const CustomerNamefield: FieldConfig<CustomerEntity>[] = [
    { name: "name", libelle: "Nom du client", type: "text", normal: true },
    { name: "phone", libelle: "Téléphone", type: "text", normal: true },
    { name: "mail", libelle: "Email", type: "text", normal: true },
    { name: "cin", libelle: "Carte d'identité Nationale", type: "text", normal: true },
    { name: "address", libelle: "Adresse", type: "text", normal: true },
];