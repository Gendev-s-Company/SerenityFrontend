import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { PlatEntity } from "@/types/entity-type/platEntity";

export const PlatColumnOptions: ColumnConfig<PlatEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" ,href: (row) => `/dishes/${row.dishID}`},
    { key: "dishID", header: "Dishid", sorting: true },
    { key: "name", header: "Name", type: "link", sorting: true, 
        href: (row) => `/view/restaurant/plat/detail?dishID=${row.dishID}`,
    },
    // { key: "typeid.name", header: "Type", type: "text", sorting: true },
    { key: "description", header: "description", type: "text", sorting: true },
];



const stateOption: FieldOptions[] = [
  { id: '1', label: 'Non disponible', color:'red' },
  { id: '0', label: 'Disponible', color:'green' },

]
export const PlatColumnOptions2: ColumnConfig<PlatEntity>[] = [
    { key: "select", header: "Select", type: "checkbox"},
    { key: "dishID", header: "Dishid", sorting: true },
    { key: "name", header: "Name", type: "text", sorting: true },
    // { key: "typeid.name", header: "Type", type: "text", sorting: true },
    { key: "description", header: "description", type: "text", sorting: true },
    {
        key: "state", header: "Statut", type: "text", sorting: true, cell: (row) => {
        const val = stateOption.find((r) => r.id === row.state.toString())

        return (
            <p style={{ color: val?.color }}>{val?.label}</p>
        )
        }

    },
];


export const PlatNamefield: FieldConfig<PlatEntity>[] = [
    { name: "name", libelle: "name:", type: "text", normal: true },
    { name: "description", libelle: "description :", type: "textarea", normal: false },
      
];