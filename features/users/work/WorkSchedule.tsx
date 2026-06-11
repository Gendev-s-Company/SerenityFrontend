"use client";
import {
  createworkSC,
  deleteworkSC,
  getPaginateworkSCByUser,
  updateworkSC,
} from "@/infrastructure/user/workschedule/workscheduleRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { PageType } from "@/types/component-type/PageType";
import { WorkSchedule } from "@/types/entity-type/workschedule";
import { pageSize } from "@/utils/PaginationUtility";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { WSCColumnOptions, WSCNamefield } from "./prep-view-work";
import { DataTable } from "@/components/liste/complexe-data-table";
import { getLocalStorage } from "@/utils/storage";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { getAllUser, getUserById } from "@/infrastructure/user/userRequest";
import { convertListUsersToOption } from "@/infrastructure/user/userFunction";
import { UserEntity } from "@/types/entity-type/userEntity";

export default function WorkSchedulePage() {
  const [works, setWorks] = useState<WorkSchedule[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<FieldOptions[]>([]);


  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const [all, setAll] = useState<PageType>({
    totalElement: 0,
    totalPage: 0,
  });
  const user = getLocalStorage()!
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    if(user.profil.company.companyID){
      getPaginateworkSCByUser(user.userID!, page.pageIndex, page.pageSize)
        .then((data) => {
          setWorks(data.content);
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
           console.error("Error fetching profils:", error)
            setLoading(false)
         });
    }       
  }, [refresh, page.pageIndex]);


  // Liste des utilisateurs par companie
  useEffect(() => {
    if (user) {
      if (user.profil.authority >= 4 && user.profil.company.companyID) {
        getAllUser(user.profil.company.companyID)
          .then((data) => {
              console.log('Liste utilisateur:',data)
              setUsers(convertListUsersToOption(data))
            })
          .catch((error) => console.log(error));
      } else {
        getUserById(user.userID!)
          .then((data) => {
            const userList: UserEntity[] = [];
            userList.push(data);
            setUsers(convertListUsersToOption(userList));
          })
          .catch((error) => console.log(error));
      }
    }
  }, []);

  const options: FieldConfig<WorkSchedule> = useMemo(
    () => ({
      name: "userID",
      libelle: "Utilisateur :",
      type: "select",
      normal: false,
      items: users,
      objectMapping: {
          idKey: "userID",     
          labelKey: "name",     
      },
    }),
    [users],
  );
  const namefield = useMemo(() => {
    return [options,...WSCNamefield];
  }, [options]);

  const onUpdate = async (formData: WorkSchedule) => {
    const dataToSend = {
      ...formData,
      userID: formData.userID?.userID || formData.userID
    };
    // console.log('Donnees envoyees:',formData);
    await updateworkSC(dataToSend);
    setRefresh((prev) => prev + 1);
  };
  const onDelete = async (id: string | null) => {
    if (id !== null) {
      await deleteworkSC(id);
      setRefresh((prev) => prev + 1);
    }
  };

  const btnAction: ColumnConfig<WorkSchedule> = {
    key: "action_btn",
    header: "Action",
    type: "button",
    hiding: false,
    onUpdate: (row) => onUpdate(row),
    onDelete: (row) => onDelete(row.scheduleID),
    onClick: (row) => console.log("Editer", row.scheduleID),
  };
  const columns = useMemo(() => {
    return[...WSCColumnOptions, btnAction];
  }, []);

  const body: WorkSchedule = {
    scheduleID: null,
    userID: user?.userID ? user.userID : "",
    starttime: new Date(),
    endtime: null,
    color:"#2196F3",
    status: 0
  };

  const onCreate = async (formData: WorkSchedule) => {
    const dataToSend = {
      ...formData,
      userID: formData.userID?.userID || formData.userID
    };
    // console.log('Donnees envoyees:',formData);
    await createworkSC(dataToSend);
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto py-10 px-3">
      <DataTable
        body={body}
        onCreate={onCreate}
        data={works}
        mcolumns={columns}
        fields={namefield}
        columnFilter="userID"
        pageCount={all.totalPage}
        rowCount={all.totalElement}
        onPaginationChange={setPage}
        pagination={page}
        loading={loading}
        authority={user?.profil?.authority}
      />
    </div>
  );
}
