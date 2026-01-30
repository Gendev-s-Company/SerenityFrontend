"use client";

import { DataTable } from "@/components/liste/complexe-data-table";
import { createProfil, deleteProfil, getAllProfils, updateProfil } from "@/infrastructure/user/profil/profilRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { ProfilEntity } from "@/types/entity-type/profilEntity";
import { useEffect, useState } from "react";

export default function Profil() {
  const [profil, setProfil] = useState<ProfilEntity[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  useEffect(() => {
    getAllProfils()
      .then((data) => setProfil(data))
      .catch((error) => console.error("Error fetching profils:", error));
  }, [refresh]);
  const onUpdate = async (formData: ProfilEntity) => {
    await updateProfil(formData);
    setRefresh((prev) => prev + 1);
  };
  const onDelete = async (id: string) => {
    await deleteProfil(id);
    setRefresh((prev) => prev + 1);
  };
  const ColumnOptions: ColumnConfig<ProfilEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" },
    { key: "profilID", header: "ProfilID", sorting: true },
    { key: "companyid", header: "CompanyID", sorting: true },
    {
      key: "name",
      header: "Nom",
      type: "text",
      href: (row) => `/profil/${row?.profilID}`,
      hiding: false,
    },
    { key: "authority", header: "Autorité", type: "text", sorting: true },
    {
      key: "action_btn",
      header: "Action",
      type: "button",
      hiding: false,
      onUpdate: (row) => onUpdate(row),
      onDelete: (row) => onDelete(row.profilID),
      onClick: (row) => console.log("Editer", row.profilID),
    },
  ];
  const namefield: FieldConfig<ProfilEntity>[] = [
    { name: "name", libelle: "Nom :", type: "text", normal: true },
    { name: "authority", libelle: "authority :", type: "number", normal: true },
  ];
  const body: ProfilEntity = {
    profilID: "",
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
        mcolumns={ColumnOptions}
        fields={namefield}
        columnFilter="name"
      />
    </div>
  );
}
