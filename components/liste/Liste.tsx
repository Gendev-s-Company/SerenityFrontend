import { flexRender,Table as TTable } from "@tanstack/react-table";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../ui/table";
interface Listeprops<TData> {
  table: TTable<TData>; 
  loading?: boolean
}
export default function Liste<TData>({
  table,
  loading = false,
}: Listeprops<TData>) {
  const columnCount = table.getAllColumns().length
  const rowCount = table.getState().pagination.pageSize

  return (
    <Table className="min-w-[1100px]">
      {/* HEADER */}
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="text-center">
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="text-center ">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      {/* BODY */}
      <TableBody>
        {/* 🔹 SKELETON LOADING */}
        {loading ? (
          Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="animate-pulse text-center">
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <TableCell key={colIndex} >
                  <div className="h-4 w-full rounded-md bg-muted" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : table.getRowModel().rows.length ? (
          /* 🔹 DONNÉES */
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="normal-case"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="normal-case text-center">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          /* 🔹 EMPTY STATE */
          <TableRow>
            <TableCell
              colSpan={columnCount}
              className="h-24 text-center text-muted-foreground"
            >
              Aucun résultat dans cette page.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
