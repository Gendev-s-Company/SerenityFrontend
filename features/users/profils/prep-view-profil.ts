import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { ProfilEntity } from "@/types/entity-type/profilEntity";

export const ProfilColumnOptions: ColumnConfig<ProfilEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" },
    { key: "profilID", header: "ProfilID", sorting: true }, 
    {
        key: "name",
        header: "Nom",
        type: "text",
        href: (row) => `/profil/${row?.profilID}`,
        hiding: false,
        sorting:true,
    },
    { key: "authority", header: "Autorité", type: "text", sorting: true },
    { key: "stateLabel", header: "Etat", type: "text", sorting: true },
];
export const ProfilNamefield: FieldConfig<ProfilEntity>[] = [
    { name: "name", libelle: "Nom :", type: "text", normal: true },
    { name: "authority", libelle: "authority :", type: "number", normal: true },
];