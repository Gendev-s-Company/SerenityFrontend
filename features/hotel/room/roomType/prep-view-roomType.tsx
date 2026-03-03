import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { RoomTypeEntity } from "@/types/entity-type/roomTypeEntity";

export const RoomTypeColumnOptions: ColumnConfig<RoomTypeEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/roomType/${row.typeID}`},
    { key: "typeID", header: "typeID", sorting: true },
    { key: "company.name", header: "Société", type:'text', sorting: true },
    { key: "name", header: "Type de chambre", type: "text", sorting: true },
    { key: "description", header: "description", type: "text", sorting: true },
];
export const RoomTypeNamefield: FieldConfig<RoomTypeEntity>[] = [
    { name: "name", libelle: "Type de chambre:", type: "text", normal: true },
    { name: "description", libelle: "description :", type: "textarea", normal: false },
      
];