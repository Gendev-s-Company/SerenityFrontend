import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { ActivityPriceEntity } from "@/types/entity-type/activityPriceEntity";

export const ActivityPriceColumnOptions: ColumnConfig<ActivityPriceEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/activities/${row.priceID}`},
    { key: "priceID", header: "priceID", sorting: true },
    { key: "hourPrice", header: "Prix à l'heure", type: "amount", sorting: true },
    { key: "price", header: "Prix nuitée", type: "amount", sorting: true },
    { key: "dateChanged", header: "Date du prix", type: "date", sorting: true  },

];
export const ActivityPriceNamefield: FieldConfig<ActivityPriceEntity>[] = [
    { name: "hourPrice", libelle: "Prix de l'heure:", type: "number", normal: true, min: 0 },
    { name: "price", libelle: "Prix nuitée :", type:"number", normal: true, min: 0 },
    { name: "dateChanged", libelle: "date :", type:"date", normal: true },

];