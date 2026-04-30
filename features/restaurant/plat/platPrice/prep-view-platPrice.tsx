import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { PlatPriceEntity } from "@/types/entity-type/platPriceEntity";

export const PlatPriceColumnOptions: ColumnConfig<PlatPriceEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/activities/${row.priceID}`},
    { key: "priceID", header: "priceID", sorting: true },
    // { key: "dish.name", header: "Plat", type:'text', sorting: true },
    { key: "price", header: "Prix", type: "amount", sorting: true },
    { key: "dateChanged", header: "Date du prix", type: "date", sorting: true  },

];
export const PlatPriceNamefield: FieldConfig<PlatPriceEntity>[] = [
    { name: "price", libelle: "prix :", type:"number", normal: true },
    { name: "dateChanged", libelle: "date :", type:"date", normal: true },

];