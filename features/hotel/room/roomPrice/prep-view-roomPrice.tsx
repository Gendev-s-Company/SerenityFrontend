import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { RoomPriceEntity } from "@/types/entity-type/roomPriceEntity";

export const RoomPriceColumnOptions: ColumnConfig<RoomPriceEntity>[] = [
    // { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/activities/${row.priceID}`},
    { key: "priceID", header: "priceID", sorting: true },
    { key: "hourPrice", header: "Heure", type: "text", sorting: true },
    { key: "nightPrice", header: "Nuit", type: "text", sorting: true },
    { key: "dateChanged", header: "Date du prix", type: "date", sorting: true  },
    { key: "accountRate", header: "Taux de compte", type: "text", sorting: true },


];
export const RoomPriceNamefield: FieldConfig<RoomPriceEntity>[] = [
    { name: "hourPrice", libelle: "Durée (h):", type: "number", normal: true },
    { name: "nightPrice", libelle: "Durée (nuit):", type: "number", normal: true },
    { name: "accountRate", libelle: "Taux de compte :", type:"number", normal: true },
    { name: "dateChanged", libelle: "date :", type:"date", normal: true },

];