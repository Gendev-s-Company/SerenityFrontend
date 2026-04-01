"use client";
import { createTable, deleteTable, getPaginateTable, updateTable } from "@/infrastructure/restaurant/table/restauranttable/restaurantTableRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { RestaurantTableEntity } from "@/types/entity-type/restauranTableEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { RestaurantTableColumnOptions, RestaurantTableNameField } from "./prep-view-restaurantTable";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { CompanyEntity } from "@/types/entity-type/companyEntity";
import { DataTable } from "@/components/liste/complexe-data-table";
import { getAllTableType } from "@/infrastructure/restaurant/table/tabletype/tableTypeRequest";
import { convertListToOption } from "@/infrastructure/restaurant/table/tableType/tabletypeFonction";

export default function RestaurantTable() {
    const [restaurantTable,setRestaurantTable]=useState<RestaurantTableEntity[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const user = getLocalStorage()!;
    const [tableTypeOption, setTableTypeOption] = useState<FieldOptions[]>([]);
    const [page, setPage] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    });
    const [all, setAll] = useState({
        totalElement: 0,
        totalPage: 0,
    });
    const [loading, setLoading] = useState(true);


    // maka anle liste profil zay atao en option
    useEffect(() => {
      if (user && user.profil.company.companyID) {
        getAllTableType(user.profil.company.companyID)
          .then((data) => {
            setTableTypeOption(convertListToOption(data));
          })
          .catch((error) => console.error("Error fetching type table:", error));
      }
    }, []);

    useEffect(()=> {
        setLoading(true);
        if (user && user.profil.company.companyID) {
        getPaginateTable(user.profil.company.companyID,page.pageIndex,page.pageSize)
            .then((data) => {                
                setRestaurantTable(data.content);
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
              console.error("Error fetching restaurant tables:", error)
            });
        }
    },[refresh, page.pageIndex]);

    const onUpdate = async (formData: RestaurantTableEntity) => {
       await updateTable(formData);
       setRefresh((prev) => prev + 1);
    };

    const onDelete = async (id: string | null) => {
      if (id !== null) {
        await deleteTable(id);
        setRefresh((prev) => prev + 1);
      }
    }

    const btnAction: ColumnConfig<RestaurantTableEntity> = {
      key: "action_btn",
      header: "Action",
      type: "button",
      hiding: false,
      onUpdate: (row) => onUpdate(row),
      onDelete: (row) => onDelete(row.tableID),
      onClick: (row) => console.log("Editer", row.tableID),
    };


    const columns = useMemo(() => {
      return [...RestaurantTableColumnOptions, btnAction];
    }, []);

      const options: FieldConfig<RestaurantTableEntity> = useMemo(
        () => ({
          name: "tabletype",
          libelle: "Type de table :",
          type: "select",
          normal: false,
          items: tableTypeOption,
          // metttre l'idkey en le primary key de l'objet, puis labelKey le label que vous voulez afficher
          objectMapping: {
            idKey: "tabletypeid",
            labelKey: "name",
          },
        }),
        [tableTypeOption],
      );

    const namefield = useMemo(() => {
      return [...RestaurantTableNameField.slice(0, 2), options, ...RestaurantTableNameField.slice(2)];
    }, [options]);

    const company: CompanyEntity = {
        skipValidation: true,
        companyID: null,
        mail: "",
        name: "",
        phone: "",
        status: 0,
      };

    const body: RestaurantTableEntity = {
      tableID: null,
      name: "",
      description: "",
      tabletype:{
        skipValidation: true,
        tabletypeid: "",
        name: "",
        description: "",
        company:company,
        status: 0,
      },
      capacity: 0,
      status: 0,
    };
    const onCreate = async (formData: RestaurantTableEntity) => {
      const body = formData;
      await createTable(body);
      setRefresh((prev) => prev + 1);
    };

    return (
    <div className="container mx-auto py-10 px-3">

      <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
        <h2 className="text-xl font-semibold">{"Liste des personnes enregistrés dans l'établissement"}</h2>
        <DataTable
          body={body}
          onCreate={onCreate}
          data={restaurantTable}
          mcolumns={columns}
          fields={namefield}
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