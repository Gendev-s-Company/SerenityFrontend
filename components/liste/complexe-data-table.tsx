"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
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

interface DataTableProps<TData> {
  mcolumns: ColumnConfig<TData>[];
  data: TData[];
  fields: FieldConfig<TData>[];
  onCreate: (data: TData) => void;
  body: TData,
  columnFilter: string,
  rowCount: number; 
  pageCount: number; 
  pagination: PaginationState; 
  onPaginationChange: OnChangeFn<PaginationState>; 
}
export function DataTable<TData>({
  data,
  mcolumns,
  fields,
  onCreate,
  body,
  columnFilter,
  rowCount,
  pageCount,
  pagination,
  onPaginationChange
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [rowSelection, setRowSelection] = React.useState({});
  const columns = generateColumns<TData>(mcolumns, fields);

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount, 
    manualPagination: true, 
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: onPaginationChange,
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
          placeholder={`Recherche ${columnFilter}...`}
          value={(table.getColumn(columnFilter)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(columnFilter)?.setFilterValue(event.target.value)
          }
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
            {table.getPageCount()} ({rowCount} éléments au total)
          </div>
          <Paginate table={table}/>
        </div>
      </div>
    </div>
  );
}
