import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { ActivityPriceEntity } from "@/types/entity-type/activityPriceEntity";

export const ActivityPriceColumnOptions: ColumnConfig<ActivityPriceEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/activities/${row.priceID}`},
    { key: "priceID", header: "priceID", sorting: true },
    { key: "activity.name", header: "Activité", type:'text', sorting: true },
    { key: "hourPrice", header: "Heure", type: "text", sorting: true },
    { key: "price", header: "Prix", type: "amount", sorting: true, amountType:{currency:'MGA', lang:'fr'} },
    { key: "dateChanged", header: "Date du prix", type: "date", sorting: true  },

];
export const ActivityPriceNamefield: FieldConfig<ActivityPriceEntity>[] = [
    { name: "hourPrice", libelle: "prix par heure:", type: "number", normal: true },
    { name: "price", libelle: "prix :", type:"number", normal: true },
    { name: "dateChanged", libelle: "date :", type:"date", normal: true },

];