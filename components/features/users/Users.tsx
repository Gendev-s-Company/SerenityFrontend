"use client";

import { DataTable } from "@/components/liste/complexe-data-table";
import { convertListToOption } from "@/infrastructure/user/profil/profilFunction";
import { getAllProfils } from "@/infrastructure/user/profil/profilRequest";
import {
  createUser,
  deleteUser,
  getAllUser,
  updateUser,
} from "@/infrastructure/user/userRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { ProfilEntity } from "@/types/entity-type/profilEntity";
import { UserEntity } from "@/types/entity-type/userEntity";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [profilOption, setProfilOption] = useState<FieldOptions[]>([])
  useEffect(() => {
    getAllProfils()
      .then((data) => {
        console.log(data);
        setProfilOption(convertListToOption(data))
      })
      .catch((error) => console.error("Error fetching profils:", error));
  }, []);
  useEffect(() => {
    getAllUser()
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [refresh]);

  const onUpdate = async (formData: UserEntity) => {
    console.log(formData);

    await updateUser(formData);
    setRefresh((prev) => prev + 1);
  };
  const onDelete = async (id: string) => {
    await deleteUser(id);
    setRefresh((prev) => prev + 1);
  };
  const ColumnOptions: ColumnConfig<UserEntity>[] = [
    { key: "select", header: "Select", type: "checkbox" },
    { key: "userID", header: "userID", sorting: true },
    {
      key: "name",
      header: "Nom",
      type: "text",
      href: (row) => `/profil/${row?.userID}`,
      hiding: false,
    },
    { key: "profil.name", header: "profil", type: "text", sorting: true },
    { key: "phone", header: "Téléphone", type: "text", sorting: true },
    {
      key: "joinedDate",
      header: "Date d'inscription",
      type: "text",
      sorting: true,
    },
    { key: "status", header: "Statut", type: "text", sorting: true },
    {
      key: "action_btn",
      header: "Action",
      type: "button",
      hiding: false,
      onUpdate: (row) => onUpdate(row),
      onDelete: (row) => onDelete(row.userID),
      onClick: (row) => console.log("Editer", row.userID),
    },
  ];
  const namefield: FieldConfig<UserEntity>[] = [
    { name: "name", libelle: "Nom :", type: "text", normal: true },
    {
      name: "profil",
      libelle: "Profil :",
      type: "select",
      normal: false,
      items: profilOption,
    },
    { name: "phone", libelle: "Téléphone :", type: "text", normal: true },
    {
      name: "joineddate",
      libelle: "Date d'inscription :",
      type: "date",
      normal: true,
    },
    { name: "status", libelle: "Statut :", type: "number", normal: true },
  ];
  const body: UserEntity = {
    userID: "",
    name: "",
    profil: { profilID: "", name: "", companyid: "COMP000001", authority: 0 },
    phone: "",
    joineddate: "",
    password: "1234",
    status: 0,
  };

  const onCreate = async (formData: UserEntity) => {
    console.log(formData);

    await createUser(formData);
    setRefresh((prev) => prev + 1);
  };
  return (
    <div className="container mx-auto py-10 px-3">
      <DataTable
        body={body}
        onCreate={onCreate}
        data={users}
        mcolumns={ColumnOptions}
        fields={namefield}
        columnFilter="name"
      />
    </div>
  );
}
