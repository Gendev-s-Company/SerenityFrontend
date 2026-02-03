import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { CompanyEntity } from "@/types/entity-type/companyEntity";
// préparation des colonnes à utiliser dans company.tsx
export const CompanyColumnOptions: ColumnConfig<CompanyEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" },
    { key: "companyID", header: "companyID", sorting: true },
    { key: "mail", header: "Email", sorting: true },
    {
        key: "name",
        header: "Nom",
        type: "text",
        href: (row) => `/profil/${row?.companyID}`,
        hiding: false,
    },
    { key: "phone", header: "Téléphone", type: "text", sorting: true },
    { key: "status", header: "Statut", sorting: true },
];
// préparation des fields à utiliser pour le form de create et update
export   const CompanyNamefield: FieldConfig<CompanyEntity>[] = [
        { name: "name", libelle: "Nom :", type: "text", normal: true },
        { name: "mail", libelle: "Email :", type: "text", normal: true },
        { name: "phone", libelle: "Téléphone :", type: "text", normal: true },
        { name: "status", libelle: "Statut :", type: "number", normal: true }
    ];