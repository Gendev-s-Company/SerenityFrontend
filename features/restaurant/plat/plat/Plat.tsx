"use client";
import { ColumnConfig } from "@/types/component-type/column-config";
import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { CompanyEntity } from "@/types/entity-type/companyEntity";
import { DataTable } from "@/components/liste/complexe-data-table";
import { PlatEntity } from "@/types/entity-type/platEntity";
import { createPlat, deletePlat, getPaginatePlat, updateDispo, updatePlat } from "@/infrastructure/restaurant/plat/plat/platRequest";
import { PlatColumnOptions, PlatNamefield } from "./prep-viewPlat";
import { getAllPlatType } from "@/infrastructure/restaurant/plat/platType/platTypeRequest";
import { convertListToOption } from "@/infrastructure/restaurant/plat/platType/platTypeFonction";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { BookmarkX } from "lucide-react";

export default function Plat() {
    const [Plat,setPlat]=useState<PlatEntity[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const user = getLocalStorage()!;
    const [PlatTypeOption, setPlatTypeOption] = useState<FieldOptions[]>([]);
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
        getAllPlatType(user.profil.company.companyID)
          .then((data) => {
            setPlatTypeOption(convertListToOption(data));
          })
          .catch((error) => console.error("Error fetching type table:", error));
      }
    }, []);

    useEffect(()=> {
        setLoading(true);
        if (user && user.profil.company.companyID) {
        getPaginatePlat(user.profil.company.companyID,page.pageIndex,page.pageSize)
            .then((data) => {                
                setPlat(data.content);
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

    const onUpdate = async (formData: PlatEntity) => {
       await updatePlat(formData);
       setRefresh((prev) => prev + 1);
    };

    const onDelete = async (id: string | null) => {
      if (id !== null) {
        await deletePlat(id);
        setRefresh((prev) => prev + 1);
      }
    }



    const fonctionDispo = async (formData: PlatEntity) => {
        await updateDispo(formData, "0");
        setRefresh((prev) => prev + 1);
    };


    const fonctionNonDispo = async (formData: PlatEntity) => {
        await updateDispo(formData, "1");
        setRefresh((prev) => prev + 1);
    };

    const btnAction: ColumnConfig<PlatEntity> = {
      key: "action_btn",
      header: "Action",
      type: "button",
      hiding: false,
      onUpdate: (row) => onUpdate(row),
      onDelete: (row) => onDelete(row.dishID),
      onClick: (row) => console.log("Editer", row.dishID),
    };


    const columns = useMemo(() => {
      return [...PlatColumnOptions, btnAction];
    }, []);

    const options: FieldConfig<PlatEntity> = useMemo(
    () => ({
        name: "type",
        libelle: "Type de plat :",
        type: "select",
        normal: false,
        items: PlatTypeOption,
        // metttre l'idkey en le primary key de l'objet, puis labelKey le label que vous voulez afficher
        objectMapping: {
        idKey: "typeID",
        labelKey: "name",
        },
    }),
    [PlatTypeOption],
    );

    const namefield = useMemo(() => {
      return [...PlatNamefield.slice(0, 2), options, ...PlatNamefield.slice(2)];
    }, [options]);

    const company: CompanyEntity = {
        skipValidation: true,
        companyID: null,
        mail: "",
        name: "",
        phone: "",
        status: 0,
      };

    const body: PlatEntity = {
      dishID: null,
      name: "",
      description: "",
      type:{
        skipValidation: true,
        typeID: "",
        name: "",
        description: "",
        company:company,
        status: 0,
      },
      status: 0,
      state: 0
    };
    const onCreate = async (formData: PlatEntity) => {
      const body = formData;
      console.log(body)
      await createPlat(body);
      setRefresh((prev) => prev + 1);
    };

    return (
    <div className="container mx-auto py-10 px-3">

      <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
        <h2 className="text-xl font-semibold">{"Liste des plats enregistrés dans l'établissement"}</h2>
        <DataTable
          body={body}
          onCreate={onCreate}
          data={Plat}
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