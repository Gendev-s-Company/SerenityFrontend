"use client";

import { DataTable } from "@/components/liste/complexe-data-table";
import { convertListToOption } from "@/infrastructure/hotel/customer/customerFunction";
import { convertListToOptionActivity } from "@/infrastructure/hotel/activity/activityFunction";
import { 
    getPaginateActivityOrder, 
    getFindAllByCompany, 
    getPaginateModelByCustomerr, 
    createActivityOrder,
    updateActivityOrder,
    deleteActivityOrder,
    getPaginateActivityOrderByCompany} 
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
import { getAllCustomer } from "@/infrastructure/hotel/customer/customerRequest";
import { getAllActivity } from "@/infrastructure/hotel/activity/activityRequest";


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

  const [activityOption, setActivityOption] = useState<FieldOptions[]>([]);
  const [customerOption, setCustomerOption] = useState<FieldOptions[]>([]);


  ////Liste activity
  useEffect(() => {
      if (user && user.profil.company.companyID) {
          getAllCustomer()
              .then((data) => {
                  setCustomerOption(convertListToOption(data));
              })
              .catch((error) => console.error("Error fetching activity:", error));
        }
  }, []);

  useEffect(() => {
      if (user && user.profil.company.companyID) {
          getAllActivity(user.profil.company.companyID)
              .then((data) => {
                  setActivityOption(convertListToOptionActivity(data));
              })
              .catch((error) => console.error("Error fetching activity:", error));
        }
  }, []);


  useEffect(() => {
    setLoading(true)
    if (user && user.profil.company.companyID) {
      getPaginateActivityOrderByCompany(page.pageIndex, page.pageSize, user.profil.company.companyID)
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
    status: 0,
    skipValidation: true,
  };

  const customer: CustomerEntity = {
    customerID: "",
    name: "",
    phone: "",
    mail: "",
    skipValidation: true,
  };

  const body: ActivityOrderEntity = {
    acOrderID: "",
    activity: activity,
    customer: customer,
    dateOrder: new Date().toDateString(),
    price: 0,
    duration: 0,
    skipValidation: true,
  };


  const columns = useMemo(() => {
      return [...ActivityOrderColumnOptions, btnAction];
    }, []);

    const options: FieldConfig<ActivityOrderEntity> = useMemo(
      () => ({
        name: "activity",
        libelle: "Activité :",
        type: "select",
        normal: false,
        items: activityOption,
        objectMapping: {
          idKey: "activityID",
          labelKey: "name",
        },
      }),
      [activityOption],
    );

    const optionsCustomer: FieldConfig<ActivityOrderEntity> = useMemo(
      () => ({
        name: "customer",
        libelle: "Client :",
        type: "select",
        normal: false,
        items: customerOption,
        objectMapping: {
          idKey: "customerID",
          labelKey: "name",
        },
      }),
      [customerOption],
    );


    const namefield = useMemo(() => {
      return [...ActivityOrderfield.slice(0, 2), options, optionsCustomer, ...ActivityOrderfield.slice(3)];
    }, [options, optionsCustomer]);

  return (
    <div className="container mx-auto py-10 px-3">
      
      <DataTable
        body={body}
        onCreate={onCreate}
        data={activitieso}
        mcolumns={columns}
        fields={namefield}
        columnFilter="acorderID"
        pageCount={all.totalPage}
        rowCount={all.totalElement}
        onPaginationChange={setPage}
        pagination={page}
        loading={loading}
      />
    </div>
  );

}
