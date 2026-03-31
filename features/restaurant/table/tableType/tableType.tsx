"use client";
import { TableTypeEntity } from "@/types/entity-type/tableTypeEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { createTabletype, deleteTableType, getPaginateTableTypes, updateTableType } from "../../../../infrastructure/restaurant/table/tabletype/tableTypeRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { TableTypeColumnOptions, TableTypeNameField } from "@/features/restaurant/table/tableType/prep-view-tableType";
import { DataTable } from "@/components/liste/complexe-data-table";

export default function TableType() {
    const[tableType,setTableType]=useState<TableTypeEntity[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const user = getLocalStorage()!;
    const [page, setPage] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    });

    const [all, setAll] = useState({
        totalElement: 0,
        totalPage: 0,
    });

    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        setLoading(true);
        if (user && user.profil.company.companyID) {
        getPaginateTableTypes(user.profil.company.companyID!,page.pageIndex,page.pageSize)
            .then((data) => {
                setTableType(data.content);
                setPage((prevPage) => ({
                  ...prevPage,
                  pageIndex: data.pageable.pageNumber,
                }));
                setAll({
                  totalElement: data.totalElements,
                  totalPage: data.totalPages,
                });
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching table types:", error)
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


    const body: TableTypeEntity = {
      tabletypeid: null,
      name: "",
      description: "",
      company: user.profil.company,
      status: 0,
    };

    const onCreate = async (formData: TableTypeEntity) => {
      await createTabletype(formData);
      setRefresh((prev) => prev + 1);
    };
      
    return (
    <div className="container mx-auto py-10 px-3">
      <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
        <DataTable
          body={body}
          onCreate={onCreate}
          data={tableType}
          mcolumns={columns}
          fields={TableTypeNameField}
          pageCount={all.totalPage}
          rowCount={all.totalElement}
          onPaginationChange={setPage}
          pagination={page}
          columnFilter="name"
          loading={loading}
          authority={user?.profil?.authority}
        />
      </div>
    </div>
    );
}