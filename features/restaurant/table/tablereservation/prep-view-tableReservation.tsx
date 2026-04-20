import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { TableReservationEntity } from "@/types/entity-type/tableReservationEntity";

const reservationStateOptions: FieldOptions[] = [
  { id: '1', label: 'Non validé' },
  { id: '2', label: 'Validé' },
  { id: '7', label: 'En cours' },

];

const stateOption: FieldOptions[] = [
  { id: '1', label: 'Non validé', color:'blue' },
  { id: '2', label: 'Validé', color:'green' },
  { id: '8', label: 'Annulé', color:'gray' },
  { id: '4', label: 'Occupé', color:'blue' },
  { id: '5', label: 'Terminé', color:'purple' },

]

export const TableReservationColumnOptions: ColumnConfig<TableReservationEntity>[] = [
  { key: "occupationID", header: "ID", sorting: true },
  { key: "customer.name", header: "Client", type: "text", sorting: true },
//   { key: "Table.name", header: "Table", type: "link", href: (row) => `/view/restaurant/details/detail?TableID=${row.TableID}` },
  { key: "starttime", header: "Début", type: "datetime", sorting: true },
  { key: "endtime", header: "Fin", type: "datetime", sorting: true },
   {
    key: "state", header: "Statut", type: "text", sorting: true, cell: (row) => {
      const val = stateOption.find((r) => r.id === row.state.toString())
      console.log(row.state);
      
      console.log(val);
      
      return (
        <p style={{ color: val?.color }}>{val?.label}</p>
      )
    }

  },
//   { key: "state", header: "Statut", type: "text"},
];


export const TableReservationFields: FieldConfig<TableReservationEntity>[] = [
  { name: "customerID", libelle: "Client :", type: "select", normal: true },
  { name: "tableID", libelle: "Table :", type: "select", normal: true },
  { name: "starttime", libelle: "Date début occupation :", type: "date", normal: true },
  { name: "endtime", libelle: "Date fin occupation :", type: "date", normal: true },
  { name: "state", libelle: "État réservation :", type: "select", items: reservationStateOptions, normal: false },
];