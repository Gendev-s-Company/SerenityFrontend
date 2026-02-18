"use client";

import { DataTable } from "@/components/liste/complexe-data-table";
import { convertListToOption } from "@/infrastructure/user/profil/profilFunction";
import { 
    getPaginateActivityOrder, 
    getFindAllByCompany, 
    getPaginateModelByCustomerr, 
    createActivityOrder,
    updateActivityOrder,
    deleteActivityOrder} 
from "@/infrastructure/hotel/activity/activityOrderRequets";
import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { PageType } from "@/types/component-type/PageType";
import { pageSize } from "@/utils/PaginationUtility";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { getLocalStorage } from "@/utils/storage";
import { CompanyEntity } from "@/types/entity-type/companyEntity";
import { ActivityOrderEntity } from "@/types/entity-type/activityorderEntity";
import { ActivityEntity } from "@/types/entity-type/activityEntity";
import { CustomerEntity } from "@/types/entity-type/customerEntity";
import { ActivityOrderfield, ActivityOrderColumnOptions } from "./prep-view-activityOrder";


export default function ActivitiesOrder() {
  const user = getLocalStorage();//maka localstorage 
  const [activitieso, setActivitieso] = useState<ActivityOrderEntity[]>([]);
  const [refresh, setRefresh] = useState<number>(0);

  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const [all, setAll] = useState<PageType>({
    totalElement: 0,
    totalPage: 0,
  });


  useEffect(() => {
    setLoading(true)
    if (user && user.profil.company.companyID) {
      getPaginateActivityOrder(page.pageIndex, page.pageSize)
        .then((data) => {
          setActivitieso(data.content);
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
          setLoading(false)
          console.error("Error fetching users:", error)

        });
    }
  }, [refresh, page.pageIndex]);


  const onCreate = async (formData: ActivityOrderEntity) => {
      const body = formData;
      await createActivityOrder(body);
      setRefresh((prev) => prev + 1);
  };


  const onUpdate = async (formData: ActivityOrderEntity) => {
    await updateActivityOrder(formData);
    setRefresh((prev) => prev + 1);
  };
  // function de delete
  const onDelete = async (id: string | null) => {
    if (id !== null) {
      await deleteActivityOrder(id);
      setRefresh((prev) => prev + 1);
    }
  };


  const btnAction: ColumnConfig<ActivityOrderEntity> = {
      key: "action_btn",
      header: "Action",
      type: "button",
      hiding: false,
      onUpdate: (row) => onUpdate(row),
      onDelete: (row) => onDelete(row.acOrderID),
      onClick: (row) => console.log("Editer", row.acOrderID),
    };


  const activity: ActivityEntity = {
    activityID: "",
    company: {
      skipValidation: true,
      companyID: null,
      mail: "",
      name: "",
      phone: "",
      status: 0,
    },
    name: "",
    description: "",
    skipValidation: true,
  };

  const customer: CustomerEntity = {
    skipValidation: true,
    customerID: "",
    name: "",
    phone: "",
    mail: "",
  };

  const body: ActivityOrderEntity = {
    acOrderID: "",
    activity: activity,
    customer: customer,
    dateOrder: new Date().toDateString(),
    price: 0,
    duration: 0,
  };


  const columns = useMemo(() => {
      return [...ActivityOrderColumnOptions, btnAction];
    }, []);

    // création de l'option profil dans la liste de type de field
    // const options: FieldConfig<UserEntity> = useMemo(
    //   () => ({
    //     name: "profil",
    //     libelle: "Profil :",
    //     type: "select",
    //     normal: false,
    //     items: profilOption,
    //     // metttre l'idkey en le primary key de l'objet, puis labelKey le label que vous voulez afficher
    //     objectMapping: {
    //       idKey: "profilID",
    //       labelKey: "name",
    //     },
    //   }),
    //   [profilOption],
    // );
    // // ajout de l'option profil dans la liste de type de field
    // const namefield = useMemo(() => {
    //   return [...UserNamefield.slice(0, 2), options, ...UserNamefield.slice(2)];
    // }, [options]);

  return (
    <div className="container mx-auto py-10 px-3">
      
      <DataTable
        body={body}
        onCreate={onCreate}
        data={activitieso}
        mcolumns={columns}
        fields={ActivityOrderfield}
        columnFilter="name"
        pageCount={all.totalPage}
        rowCount={all.totalElement}
        onPaginationChange={setPage}
        pagination={page}
        loading={loading}
      />
    </div>
  );

}
