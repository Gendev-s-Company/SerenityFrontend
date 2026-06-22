"use client";

import { DataTable } from "@/components/liste/complexe-data-table";
import { createPack, deletePack, getPaginatePack, updatePack } from "@/infrastructure/pack/packRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { PageType } from "@/types/component-type/PageType";
import { PackEntity } from "@/types/entity-type/packEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { PackColumnOptions, PackNameField } from "./prep-view-pack";
import { Info, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteBox from "@/components/delete/delete-box";
import UpdateBox from "@/components/update/update-box"
import PackDetails from "./packDetails/packDetails";
import AddPackDetails from "./packDetails/addPackDetails";
import { getAllActivity } from "@/infrastructure/hotel/activity/activityRequest";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { convertListToOptionActivity } from "@/infrastructure/hotel/activity/activityFunction";
import { convertListToOption } from "@/infrastructure/restaurant/dish/dishFonction";
import { getAllDishes } from "@/infrastructure/restaurant/dish/dishRequest";
import { getAllRoom } from "@/infrastructure/hotel/room/roomRequest";
import { convertListRoomsToOption } from "../hotel/room/reservation/forms/room-choice";

export default function Pack(){
    const user = getLocalStorage();
    const [pack, setPack]= useState<PackEntity[]>([]);
    const [refresh, setRefresh]= useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: pageSize,
    });
    const [all, setAll] = useState<PageType>({
      totalElement: 0,
      totalPage: 0,
    });

    const [openDetails, setOpenDetails] = useState(false);
    const [selectedPack,setSelectedPack]=useState<PackEntity|null>();
    const [openPacks, setOpenPacks] = useState(false);
    const [roomOption,setRoomOption] = useState<FieldOptions[]>([]);
    const [activityOption, setActivityOption] = useState<FieldOptions[]>([]);
    const [dishOption,setDishOption]=useState<FieldOptions[]>([]);

    useEffect(() => {
        const companyID = user?.profil.company.companyID;
        if (!companyID) return;   
        Promise.all([
          getAllRoom(companyID),
          getAllActivity(companyID),
          getAllDishes(companyID),
        ])
          .then(([room,activities,dishes]) => {
            setRoomOption(convertListRoomsToOption(room));
            setActivityOption(convertListToOptionActivity(activities));
            setDishOption(convertListToOption(dishes));
          })
        .catch((error) => console.error("Error fetching options:", error));
    }, []);

    // Chambre
    const roomOptions: FieldConfig<PackEntity> = useMemo(
      () => ({
        name: "hotelsPack",
        libelle: "Chambres  (Optionnel) :",
        type: "select",
        normal: false,
        items: roomOption,
        objectMapping: {
          idKey: "roomID",
          labelKey: "name",
        },
      }),
      [activityOption],
    );

    // Activité
    const activityOptions: FieldConfig<PackEntity> = useMemo(
      () => ({
        name: "activityPack",
        libelle: "Activité  (Optionnel) :",
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

    // Plat
    const dishOptions: FieldConfig<PackEntity> = useMemo(
      () => ({
        name: "restoPack",
        libelle: "Plat  (Optionnel) :",
        type: "select",
        normal: false,
        items: dishOption,
        objectMapping: {
          idKey: "dishID",
          labelKey: "name",
        },
      }),
      [dishOption],
    );

    // Durée
    const duration: FieldConfig<PackEntity> = useMemo(
      () => ({
        name: "duration",
        libelle: "Durée  (Optionnel) :",
        type: "number",
        normal: true,
      }),
      [],
    );

    // Quantité
    const quantity: FieldConfig<PackEntity> = useMemo(
      () => ({
        name: "quantity",
        libelle: "Quantité (Optionnel) :",
        type: "number",
        normal: true,
      }),
      [],
    );

    useEffect(()=>{
        setLoading(true);
        if (user && user.profil.company.companyID){
            getPaginatePack(user.profil.company.companyID,page.pageIndex,page.pageSize)
            .then((data)=>{
                setPack(data.content);
                setPage((prevPage) => ({
                    ...prevPage,
                    pageIndex: data.page.number,
                }));
                setAll({
                  totalElement: data.page.totalElements,
                  totalPage: data.page.totalPages,
                });
                setLoading(false);
            })
            .catch((error)=>{
                console.error("Error fetching packs.",error);
                setLoading(false);
            })
        }
    },[refresh, page.pageIndex])
    
    const onUpdate = async (formData: PackEntity) => {
      await updatePack(formData);
      setRefresh((prev) => prev + 1);
    };

    const onDelete = async (id: string | null) => {
      if (id !== null) {
        await deletePack(id);
        setRefresh((prev) => prev + 1);
      }
    };

    const handleViewDetails = (pack: PackEntity) => {
      setSelectedPack(pack);
      setOpenDetails(true);
    };


    const btnAction: ColumnConfig<PackEntity> = {
      key: "action_btn",
      header: "Action",
      type: "button",
      hiding: false,  
      cell: (row: PackEntity) => (
        <div className="flex gap-2">
          {/* Voir details */}
          <Button
            variant="outline" size="icon-sm" className="cursor-pointer"
            onClick={() => handleViewDetails(row)}
          >
            <Info className="h-4 w-4" />
          </Button>
            {/* Modifier */}
          <UpdateBox  body={row} onUpdate={(row) => onUpdate(row)} fields={PackNameField} />

            {/* Supprimer */}
          <DeleteBox id={row.packID!} onDelete={() => onDelete(row.packID)} />
        </div>
      )
  }

    const columns = useMemo(() => {
        return [...PackColumnOptions, btnAction];
    }, []);

    const namefield = useMemo(() => {
      return [
        ...PackNameField, 
        duration,
        quantity,
        roomOptions,
        activityOptions,
        dishOptions,

      ];
    }, [duration,quantity,roomOptions, activityOptions, dishOptions]);

    const body: PackEntity = {
      packID: null,
      companyID: user?.profil?.company.companyID!,
      title: "",
      discount: 0,
      startDate: new Date(),
      endDate: new Date(),
      status: 0,
      skipValidation: false,
      activityPack: [],
      hotelsPack: [],
      restoPack: [],
      duration: 0,    // ← jamais undefined
      quantity: 0,    // ← jamais undefined
    };


    const onCreate = async (formData: Partial<PackEntity>) => {        
      const body: PackEntity = {
        packID: null,
        companyID: user?.profil?.company.companyID!,
        title: formData.title ?? "",
        discount: formData.discount ?? 0,
        startDate: formData.startDate ?? new Date(),
        endDate: formData.endDate ?? new Date(),
        status: 0,
        skipValidation: false,             
        hotelsPack: (formData.hotelsPack as any)?.roomID
          ? [{
              id: null,
              roomID: (formData.hotelsPack as any).roomID,
              duration: formData.duration ?? 0,
              status: 0,
              skipValidation: true,
            }]
          : [],
          
        activityPack: (formData.activityPack as any)?.activityID
          ? [{
              id: null,
              activityID: (formData.activityPack as any).activityID,
              duration: formData.duration ?? 0,
              status: 0,
              skipValidation: true,
            }]
          : [],
          
        restoPack: (formData.restoPack as any)?.dishID
          ? [{
              id: null,
              dishID: (formData.restoPack as any).dishID,
              quantity: formData.quantity ?? 0,
              status: 0,
              skipValidation: true,
            }]
          : [],
      };
    
      await createPack(body);
      setRefresh((prev) => prev + 1);
    };

    return (
        <div className="container mx-auto py-10 px-3">
          <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
            <h2 className="text-xl font-semibold">{"Type de table de l'établissement"}</h2>
            <DataTable
              body={body}
              onCreate={onCreate}
              data={pack}
              mcolumns={columns}
              fields={namefield}
              columnFilter="title"
              pageCount={all.totalPage}
              rowCount={all.totalElement}
              onPaginationChange={setPage}
              pagination={page}
              loading={loading}
              authority={user?.profil?.authority}
            />
          <PackDetails pack={selectedPack!} open={openDetails} onOpenChange={setOpenDetails}/>
          </div>
        </div>
    );
}