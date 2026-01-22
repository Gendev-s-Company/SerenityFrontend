import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { ColumnConfig } from "@/types/column-config"
export function generateColumns<T>(configs: ColumnConfig<T>[]): ColumnDef<T>[] {

    return configs.map((config) => {
        const isSortingEnabled = config.sorting ?? false;
        const isHidingEnabled = config.hiding ?? true;
        // 1. Cas spécifique : Checkbox
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

        // 2. Configuration standard (Texte, Bouton, Lien, Montant)
        return {
            accessorKey: config.key,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className={config.type === "amount" ? "w-full justify-end" : ""}
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {config.header}
                        {isSortingEnabled && <ArrowUpDown className="ml-2 h-4 w-4" />}
                    </Button>
                )
            },
            cell: ({ row }) => {
                const value = row.getValue(config.key)
                const rowData = row.original

                // --- Rendu conditionnel ---

                // Cas : MONTANT (MGA)
                if (config.type === "amount" && config.amountType) {
                    const amount = parseFloat(value as string)
                    const formatted = new Intl.NumberFormat(config.amountType.lang, {
                        style: "currency",
                        currency: config.amountType.currency,
                    }).format(amount)

                    return <div className="text-right font-medium">{formatted}</div>
                }

                // Cas : BOUTON
                if (config.type === "button") {
                    return (
                        <div className="flex items-start gap-2">
                            <Button className="cursor-pointer" size="icon-sm" aria-label="Submit" variant="outline">
                                <Pencil color="#2683fd" />
                            </Button>
                            <Button className="cursor-pointer" size="icon-sm" aria-label="Submit" variant="outline">
                                <Trash2 color="#f70808" />
                            </Button>
                        </div>
                    )
                }

                // Cas : LIEN
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

                // Cas par défaut : TEXTE
                return <div className="lowercase">{value as string}</div>
            },
            enableSorting: isSortingEnabled,
            enableHiding: isHidingEnabled,
        } as ColumnDef<T>
    })
}