import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { UserEntity } from "@/types/entity-type/userEntity";
// column de la table
export const UsersColumnOptions: ColumnConfig<UserEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" },
    { key: "userID", header: "userID", sorting: true },
    {
        key: "name",
        header: "Nom",
        type: "text",
        href: (row) => `/profil/${row?.userID}`,
        hiding: false,
    },
    { key: "profil.name", header: "profil", type: "text", sorting: true },
    { key: "phone", header: "Téléphone", type: "text", sorting: true },
    {
        key: "joinedDate",
        header: "Date d'inscription",
        type: "text",
        sorting: true,
    },
    { key: "status", header: "Statut", type: "text", sorting: true },
];
// type field pour le formulaire
export const UserNamefield: FieldConfig<UserEntity>[] = [
    { name: "name", libelle: "Nom :", type: "text", normal: true },

    { name: "phone", libelle: "Téléphone :", type: "text", normal: true },
    {
        name: "joinedDate",
        libelle: "Date d'inscription :",
        type: "date",
        normal: true,
    },
    { name: "status", libelle: "Statut :", type: "number", normal: true },
];