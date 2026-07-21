import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { BillingEntity } from "@/types/entity-type/billingEntity";

export const InvoiceColumnOptions: ColumnConfig<BillingEntity>[]=[
    { key: "select", header: "Select", type: "checkbox" },
    { key: "billID", header: "billID", sorting: true },
    { key: "customer.name", header: "Client", sorting: true },
    { key: "billingDate", header: "Date de facturation",type:"datetime", sorting: true },
    { key: "dueDate", header: "Date d'échéance",type:"datetime", sorting: true },
    { key: "totalAmount", header: "Montant total", sorting: true },
    { key: "status", header: "Statut", sorting: true },
];
export const InvoiceNameField: FieldConfig<BillingEntity>[] =[
    { name: "billingDate", libelle: "Date de facturation", type: "datetime-local",normal:true },
    { name: "totalAmount", libelle: "Montant total", type: "number",normal:true },
];