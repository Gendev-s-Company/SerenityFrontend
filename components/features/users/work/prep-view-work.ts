import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { WorkSchedule } from "@/types/entity-type/workschedule";

export const WSCColumnOptions: ColumnConfig<WorkSchedule>[] = [
    { key: "select", header: "Select", type: "checkbox" },
    { key: "scheduleID", header: "scheduleID", sorting: true },
    { key: "userID", header: "userID", sorting: true },
    {
        key: "starttime",
        header: "Début",
        type: "datetime",
        href: (row) => `/schedule/${row?.scheduleID}`,
        hiding: false,
    },
    {
        key: "endtime",
        header: "Fin",
        type: "datetime",
        href: (row) => `/schedule/${row?.scheduleID}`,
        hiding: false,
    },
    { key: "status", header: "Statut", type: "text", sorting: true },
];

export const WSCNamefield: FieldConfig<WorkSchedule>[] = [
    { name: "userID", libelle: "UserID :", type: "text", normal: true },
    { name: "starttime", libelle: "Début :", type: "datetime-local", normal: true },
    { name: "endtime", libelle: "Fin :", type: "datetime-local", normal: true },
    { name: "color", libelle: "Couleur :", type: "color", normal: true },
];