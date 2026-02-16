import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { ActivityEntity } from "@/types/entity-type/activityEntity";

export const ActivityColumnOptions: ColumnConfig<ActivityEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/activities/${row.activityID}`},
    { key: "activityID", header: "activityID", sorting: true },
    { key: "company.companyID", header: "CompanyID", type:'text', sorting: true },
    {
        key: "name",
        header: "Nom",
        type: "link",
        hiding: false,
        sorting: true,
        href: (row) => `/view/hotel/activity/activityPrice?activityID=${row.activityID}`,
    },
    { key: "description", header: "description", type: "text", sorting: true },
];
export const ActivityNamefield: FieldConfig<ActivityEntity>[] = [
    { name: "name", libelle: "Nom:", type: "text", normal: true },
    { name: "description", libelle: "description :", type: "text", normal: true },
];