import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { ActivityPriceEntity } from "@/types/entity-type/activityPriceEntity";
import {formatDate} from '@/utils/formatDate';
export const ActivityPriceColumnOptions: ColumnConfig<ActivityPriceEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/activities/${row.priceID}`},
    { key: "priceID", header: "priceID", sorting: true },
    { key: "activity.activityID", header: "activityID", type:'text', sorting: true },
    { key: "hourPrice", header: "hourPrice", type: "amount", sorting: true },
    { key: "price", header: "price", type: "amount", sorting: true },
    // { key: "datechanged", header: "datechanged", type: "date", sorting: true  },

];
export const ActivityPriceNamefield: FieldConfig<ActivityPriceEntity>[] = [
    { name: "hourPrice", libelle: "prix par heure:", type: "number", normal: true },
    { name: "price", libelle: "prix :", type:"number", normal: true },
    { name: "datechanged", libelle: "date :", type:"date", normal: true },

];