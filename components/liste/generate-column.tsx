import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { ColumnConfig } from "@/types/component-type/column-config"
import DeleteBox from "../delete/delete-box"
import UpdateBox from "../update/update-box"
import { FieldConfig } from "@/types/component-type/form-type"
export function generateColumns<T>(configs: ColumnConfig<T>[], fields: FieldConfig<T>[]): ColumnDef<T>[] {

    return configs.map((config) => {
        const isSortingEnabled = config.sorting ?? false;
        const isHidingEnabled = config.hiding ?? true;
        //  type  Checkbox
        if (config.type === "checkbox") {
            return {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            }
        }

        // type  standard (Texte, Bouton, Lien, Montant)
        return {
            accessorKey: config.key,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className={config.type === "amount" ? "w-full justify-end" : "text-center"}
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {config.header}
                        {isSortingEnabled && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </Button>
                )
            },
            cell: ({ row, getValue }) => {
                // const value = row.getValue(config.key)
                const value = getValue();
                const rowData = row.original


                // MONTANT (MGA)
                if (config.type === "amount" && config.amountType) {
                    const amount = parseFloat(value as string)
                    const formatted = new Intl.NumberFormat(config.amountType.lang, {
                        style: "currency",
                        currency: config.amountType.currency,
                    }).format(amount)

                    return <div className="text-right font-medium">{formatted}</div>
                }

                // drop & update
                if (config.type === "button") {
                    return (
                        <div className="flex items-start gap-2">
                            {config.onUpdate && <UpdateBox body={rowData} onUpdate={config.onUpdate} fields={fields} />}
                            <DeleteBox id={rowData["id" as keyof T] as string} onDelete={() => config.onDelete && config.onDelete(rowData)} />
                        </div>
                    )
                }

                // LIEN
                if (config.type === "link") {
                    return (
                        <Link
                            href={config.href?.(rowData) || "#"}
                            className="text-blue-500"
                        >
                            {value as string}
                        </Link>
                    )
                }
                if (config.type === "datetime") {
                    return <div className="lowercase">{new Date(value as string).toLocaleString()}</div>

                }
                 if (config.type === "date") {
                    return <div className="lowercase">{new Date(value as string).toLocaleDateString()}</div>

                }
                // TEXTE
                return <div >{value as string}</div>
            },
            enableSorting: isSortingEnabled,
            enableHiding: isHidingEnabled,
        } as ColumnDef<T>
    })
}