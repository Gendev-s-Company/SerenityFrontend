import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { RoomEntity } from "@/types/entity-type/roomEntity";

const stateOption: FieldOptions[] = [
  { id: '0', label: 'Libre' },
  { id: '1', label: 'Occupé' },
]

export const RoomColumnOptions: ColumnConfig<RoomEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/room/${row.roomID}`},
    { key: "roomID", header: "roomID", sorting: true },
    { key: "name", header: "Chambre", 
        type: "link", 
        sorting: true,
        href: (row) => `/view/hotel/room/detail?roomID=${row.roomID}` 
    },
    { key: "type.name", header: "Type", type:'text', sorting: true },
    { key: "description", header: "Description", type: "text", sorting: true },
    { key: "peoples", header: "Personne", type: "text", sorting: true },
    { key: "bed", header: "Lit disponible", type: "text", sorting: true },
    { key: "state", header: "Occupation", type: "text", sorting: true },
];
export const RoomNamefield: FieldConfig<RoomEntity>[] = [
    { name: "name", libelle: "Nom de la chambre:", type: "text", normal: true },
    { name: "description", libelle: "description :", type: "textarea", normal: true },
    { name: "peoples", libelle: "Nombre de personne :", type: "number", normal: true },
    { name: "bed", libelle: "Nombre de lit :", type: "number", normal: true },
    { name: "state", libelle: "Etat :", type: "select", normal: false, items: stateOption  },
      
];