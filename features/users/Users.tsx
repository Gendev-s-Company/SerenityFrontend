"use client";

import { DataTable } from "@/components/liste/complexe-data-table";
import { convertListToOption } from "@/infrastructure/user/profil/profilFunction";
import { getAllProfils } from "@/infrastructure/user/profil/profilRequest";
import {
  createUser,
  deleteUser,
  getAllUser,
  getPaginateUsers,
  updateUser,
} from "@/infrastructure/user/userRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { PageType } from "@/types/component-type/PageType";
import { ProfilEntity } from "@/types/entity-type/profilEntity";
import { UserEntity } from "@/types/entity-type/userEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { UserNamefield, UsersColumnOptions } from "./prep-view-users";
import { getLocalStorage } from "@/utils/storage";
import { CompanyEntity } from "@/types/entity-type/companyEntity";

export default function Users() {
  const user = getLocalStorage();
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [profilOption, setProfilOption] = useState<FieldOptions[]>([]);
  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const [all, setAll] = useState<PageType>({
    totalElement: 0,
    totalPage: 0,
  });
  useEffect(() => {
    if (user && user.profil.company.companyID) {
      getAllProfils(user.profil.company.companyID)
        .then((data) => {
          setProfilOption(convertListToOption(data));
        })
        .catch((error) => console.error("Error fetching profils:", error));
    }
  }, []);
  useEffect(() => {
    if (user && user.profil.company.companyID) {
      getPaginateUsers(user.profil.company.companyID,page.pageIndex, page.pageSize)
        .then((data) => {
          setUsers(data.content);
          setPage((prevPage) => ({
            ...prevPage,
            pageIndex: data.pageable.pageNumber,
          }));
          setAll({
            totalElement: data.totalElements,
            totalPage: data.totalPages,
          });
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [refresh, page.pageIndex]);

  const onUpdate = async (formData: UserEntity) => {
    await updateUser(formData);
    setRefresh((prev) => prev + 1);
  };
  const onDelete = async (id: string | null) => {
    if (id !== null) {
      await deleteUser(id);
      setRefresh((prev) => prev + 1);
    }
  };

  const btnAction: ColumnConfig<UserEntity> = {
    key: "action_btn",
    header: "Action",
    type: "button",
    hiding: false,
    onUpdate: (row) => onUpdate(row),
    onDelete: (row) => onDelete(row.userID),
    onClick: (row) => console.log("Editer", row.userID),
  };
  const columns = useMemo(() => {
    return [...UsersColumnOptions, btnAction];
  }, []);

  const options: FieldConfig<UserEntity> = useMemo(
    () => ({
      name: "profil",
      libelle: "Profil :",
      type: "select",
      normal: false,
      items: profilOption,
      objectMapping: {
        idKey: "profilID",
        labelKey: "name",
      },
    }),
    [profilOption],
  );
  const namefield = useMemo(() => {
    return [...UserNamefield.slice(0, 2), options, ...UserNamefield.slice(2)];
  }, [options]);
  const company: CompanyEntity = {
    skipValidation: true,
    companyID: null,
    mail: "",
    name: "",
    phone: "",
    status: 0,
  };
  const body: UserEntity = {
    userID: null,
    name: "",
    profil: {
      skipValidation: true,
      profilID: "",
      company: company,
      name: "",
      authority: 0,
    },
    phone: "",
    joinedDate: new Date().toDateString(),
    status: 0,
  };

  const onCreate = async (formData: UserEntity) => {
    const body = formData;
    if (formData.joinedDate) {
      // Formate en DD/MM/YYYY
      body.joinedDate = new Date(formData.joinedDate)
        .toISOString()
        .split("T")[0];
    }
    await createUser(body);
    setRefresh((prev) => prev + 1);
  };
  return (
    <div className="container mx-auto py-10 px-3">
      <DataTable
        body={body}
        onCreate={onCreate}
        data={users}
        mcolumns={columns}
        fields={namefield}
        columnFilter="name"
        pageCount={all.totalPage}
        rowCount={all.totalElement}
        onPaginationChange={setPage}
        pagination={page}
      />
    </div>
  );
}
