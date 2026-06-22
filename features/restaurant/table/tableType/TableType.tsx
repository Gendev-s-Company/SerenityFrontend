"use client";
// import TableType from "@/features/restaurant/table/tableType/tableType"

import { DataTable } from "@/components/liste/complexe-data-table";
// import { createtableType, deletetableType, getPaginatetableTypes, updatetableType } from '@/infrastructure/hotel/room/tableType/tableTypeRequest';
import { ColumnConfig } from "@/types/component-type/column-config";
import { useEffect, useMemo, useState } from "react";
import { TableTypeColumnOptions, TableTypeNamefield } from "./prep-view-tableType";
import { PaginationState } from "@tanstack/react-table";
import { pageSize } from "@/utils/PaginationUtility";
import { PageType } from "@/types/component-type/PageType";
import { getLocalStorage } from "@/utils/storage";
import { TableTypeEntity } from "@/types/entity-type/tableTypeEntity";
import { CompanyEntity } from "@/types/entity-type/companyEntity";
import { createTableType, deleteTableType, getPaginateTableTypes, updateTableType } from "@/infrastructure/restaurant/table/tabletype/tableTypeRequest";

export default function TableType() {
    const [tableType,settableType]=useState<TableTypeEntity[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const [page, setPage] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: pageSize,
    });
    const [all, setAll] = useState<PageType>({
      totalElement: 0,
      totalPage: 0,
    });
    const [loading, setLoading] = useState(true)
    const user = getLocalStorage()!;

     useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true)
        if (user && user.profil.company.companyID) {
          getPaginateTableTypes(
            user.profil.company.companyID!,
            page.pageIndex,
            page.pageSize,
          )
            .then((data) => {
              settableType(data.content);
              setPage((prevPage) => ({
                ...prevPage,
                pageIndex: data.page.number,
              }));
              setAll({
                totalElement: data.page.totalElements,
                totalPage: data.page.totalPages,
              });
              setLoading(false)
            })
            .catch((error) => {
              console.error("Error fetching room types:", error)
              setLoading(false)
            });
        }
      }, [refresh, page.pageIndex]);

const onUpdate = async (formData: TableTypeEntity) => {
  await updateTableType(formData);
  setRefresh((prev) => prev + 1);
};

const onDelete = async (id: string | null) => {
  if (id !== null) {
    await deleteTableType(id);
    setRefresh((prev) => prev + 1);
  }
};

  const btnAction: ColumnConfig<TableTypeEntity> = {
    key: "action_btn",
    header: "Action",
    type: "button",
    hiding: false,
    onUpdate: (row) => onUpdate(row),
    onDelete: (row) => onDelete(row.tabletypeid),
    onClick: (row) => console.log("Editer", row.tabletypeid),
  };

    const columns = useMemo(() => {
      return [...TableTypeColumnOptions, btnAction];
    }, []);

    const company: CompanyEntity = {
      skipValidation: true,
      companyID: user?.profil?.company.companyID,
      mail: "",
      name: "",
      phone: "",
      status: 0,
    };

    const body: TableTypeEntity = {
      tabletypeid: null,
      company: company,
      name: "",
      description: "",
      status: 0,
      skipValidation: false,
      tables: null,
    };

    const onCreate = async (formData: TableTypeEntity) => {
      console.log(user);
    
      console.log(formData);

      await createTableType(formData);
      setRefresh((prev) => prev + 1);
    };

      return (
        <div className="container mx-auto py-10 px-3">
          <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
            <h2 className="text-xl font-semibold">{"Type de table de l'établissement"}</h2>
            <DataTable
              body={body}
              onCreate={onCreate}
              data={tableType}
              mcolumns={columns}
              fields={TableTypeNamefield}
              columnFilter="name"
              pageCount={all.totalPage}
              rowCount={all.totalElement}
              onPaginationChange={setPage}
              pagination={page}
              loading={loading}
              authority={user?.profil?.authority}
            />
          </div>
        </div>
      );
    
}