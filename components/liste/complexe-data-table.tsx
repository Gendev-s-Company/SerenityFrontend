"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { ColumnConfig } from "@/types/component-type/column-config";
import { generateColumns } from "./generate-column";
import { Paginate } from "../pagination/Paginate";
import { FieldConfig } from "@/types/component-type/form-type";
import Tooltips from "../tooltips/tooltips";
import Liste from "./Liste";
import CreateBox from "../create/create-box";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

interface DataTableProps<TData> {
  mcolumns: ColumnConfig<TData>[];
  data: TData[];
  fields: FieldConfig<TData>[];
  onCreate:(data: TData) => void;
  body:TData
}
export function DataTable<TData>({
  data,
  mcolumns,
  fields,
  onCreate,
  body
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = generateColumns<TData>(mcolumns, fields);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Tooltips libelle="Nouveau">
          <CreateBox body={body} onSubmit={onCreate} fields={fields} />
        </Tooltips>

        {/* 
        début an'ilay filtre kely iny
      */}
        <Input
          placeholder="Recherche email..."
          // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          // onChange={(event) =>
          //   table.getColumn("email")?.setFilterValue(event.target.value)
          // }
          className="max-w-sm ml-auto"
        />
        {/* 
          fin input filter
        */}
      </div>
      <div className="overflow-hidden rounded-md border">
        <Liste table={table} />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} {" sur "}
          {table.getFilteredRowModel().rows.length} ligne(s) choisis.
        </div>
        <div className="space-x-2">
          <div className="text-muted-foreground flex-1 text-sm">
            Page {table.getState().pagination.pageIndex + 1} sur{" "}
            {table.getPageCount()} ({data.length} éléments au total)
          </div>
          <Paginate />
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button> */}
        </div>
      </div>
    </div>
  );
}
