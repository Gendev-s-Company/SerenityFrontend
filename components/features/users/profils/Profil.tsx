"use client";

import { DataTable } from "@/components/liste/complexe-data-table";
import { createProfil, deleteProfil, getPaginateProfil, updateProfil } from "@/infrastructure/user/profil/profilRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { ProfilEntity } from "@/types/entity-type/profilEntity";
import { useEffect, useMemo, useState } from "react";
import { ProfilColumnOptions, ProfilNamefield } from "./prep-view-profil";
import { PaginationState } from "@tanstack/react-table";
import { pageSize } from "@/utils/PaginationUtility";
import { PageType } from "@/types/component-type/PageType";

export default function Profil() {
  const [profil, setProfil] = useState<ProfilEntity[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  })
  const [all, setAll] = useState<PageType>({
    totalElement: 0,
    totalPage: 0
  })
  useEffect(() => {
    getPaginateProfil(page.pageIndex, page.pageSize)
      .then((data) => {
        setProfil(data.content)
        setPage(prevPage => ({
          ...prevPage,
          pageIndex: data.pageable.pageNumber
        }));
        setAll({
          totalElement: data.totalElements,
          totalPage: data.totalPages
        })
      })
      .catch((error) => console.error("Error fetching profils:", error));
  }, [refresh, page.pageIndex]);
  const onUpdate = async (formData: ProfilEntity) => {
    await updateProfil(formData);
    setRefresh((prev) => prev + 1);
  };
  const onDelete = async (id: string | null) => {
    if (id !== null) {
      await deleteProfil(id);
      setRefresh((prev) => prev + 1);
    }
  };

  const btnAction: ColumnConfig<ProfilEntity> = {
    key: "action_btn",
    header: "Action",
    type: "button",
    hiding: false,
    onUpdate: (row) => onUpdate(row),
    onDelete: (row) => onDelete(row.profilID),
    onClick: (row) => console.log("Editer", row.profilID),
  }
  const columns = useMemo(() => {
    return [...ProfilColumnOptions, btnAction];
  }, []);

  const body: ProfilEntity = {
    profilID: null,
    companyid: "COMP000002",
    name: "",
    authority: 0,
  };
  const onCreate = async (formData: ProfilEntity) => {
    await createProfil(formData);
    setRefresh((prev) => prev + 1);
  };
  return (
    <div className="container mx-auto py-10 px-3">
      <DataTable
        body={body}
        onCreate={onCreate}
        data={profil}
        mcolumns={columns}
        fields={ProfilNamefield}
        columnFilter="name"
        pageCount={all.totalPage}
        rowCount={all.totalElement}
        onPaginationChange={setPage}
        pagination={page}
      />
    </div>
  );
}
