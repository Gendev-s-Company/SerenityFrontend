import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { ActivityOrderEntity } from "@/types/entity-type/activityorderEntity";
import { getCurrency } from "@/utils/Util";
// column de la table
const stateOption: FieldOptions[] = [
  { id: '0', label: 'Non payé' },
  { id: '1', label: 'Payé' },
]

export const ActivityOrderColumnOptions: ColumnConfig<ActivityOrderEntity>[] = [
  { key: "select", header: "Select", type: "checkbox" },
  { key: "acOrderID", header: "AcOrderID", type: "text", sorting: true },
  { key: "activity.name", header: "Activité", type: "text", sorting: true },
  // { key: "activity.description", header: "Description", type: "text", sorting: true },
  { key: "customer.name", header: "Client", type: "text", sorting: true },
  { key: "price", header: "Prix unitaire", type: 'amount', amountType: { currency: 'MGA', lang: 'fr' }, sorting: true },
  {
    key: "duration", header: "Durée", type: "text", sorting: true,
    cell: (row) => <> {row.duration} h</>
  },
  {
    key: "total", header: "Prix total", type: "text", sorting: true,
    cell: (row) => <> {getCurrency('fr', 'MGA', row.price * row.duration)} MGA</>
  },
  {
    key: "state", header: "Statut", type: "text", sorting: true, cell: (row) => {
      const val = stateOption.find((r) => r.id === row.state.toString())

      return (
        <p style={{ color: val?.id === '0' ? 'red' : 'green' }}>{val?.label}</p>
      )
    }

  },
  { key: "dateOrder", header: "Date de commande", type: "datetime", sorting: true },
];


export const ActivityOrderfield: FieldConfig<ActivityOrderEntity>[] = [
  // { name: "price", libelle: "Prix :", type: "amount", normal: true },
  { name: "duration", libelle: "Durée :", type: "number", normal: true },
  { name: "state", libelle: "Statut :", type: "select", normal: false, items: stateOption },
  { name: "dateOrder", libelle: "Date de commande :", type: "datetime-local", normal: true },
];