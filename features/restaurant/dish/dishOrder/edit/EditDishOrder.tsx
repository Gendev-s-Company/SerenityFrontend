"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DishOrderEntity } from "@/types/entity-type/dishOrderEntity";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Minus, Plus, Trash2, Utensils } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/label/SectionLabel";
import Sbutton from "@/components/button/Sbutton";
import { getLocalStorage } from "@/utils/storage";
import { DishEntity } from "@/types/entity-type/dishEntity";
import { getAllDishes } from "@/infrastructure/restaurant/dish/dishRequest";
import { formatAriary } from "@/lib/invoice-data";
import { updateDishOrder, updateDishOrderState } from "@/infrastructure/restaurant/dish/dishOrder/dishOrderRequest";
import { stateLabel } from "../prep-view-dishOrder";
import { UserEntity } from "@/types/entity-type/userEntity";
import { DishOrderDetailsEntity } from "@/types/entity-type/dishOrderDetailsEntity";

interface DishOrderDetailsItem{
  id: string |null,
  dishID: string,
  unitPrice:number,
  quantity:number,
  userID: string,
}
// Model du formulaire
interface DishOrderFormData {
  totalPrice: number,
  dateOrder: string,
  state:number,
  status: number,
  details:DishOrderDetailsItem[],
}

// Propriétés du composant
interface EditDishOrderProps{
    openEditDishOrder: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: (data:DishOrderFormData) => void;
    onSuccess?: () => void;
    dishOrder?: DishOrderEntity | null,
}

// Composant
export default function EditDishOrder({
  openEditDishOrder,
  onOpenChange,
  dishOrder,
  onSuccess,
  }: 
  EditDishOrderProps){
  const user = getLocalStorage();  
  const [dishes,setDishes]=useState<DishEntity[]>([]);
  
  const [form, setForm] = useState<DishOrderFormData>({
       totalPrice: 0,
       dateOrder:"",
       state:0,
       status:0,
       details:[] as DishOrderDetailsItem[] ,
    });

  const [state, setState] = useState<number>(
    dishOrder?.state ?? 0
  );

  // Mise a jour
  const handleSubmit = () => {
    const body : DishOrderEntity = {
      orderID: dishOrder?.orderID ?? null,
      totalPrice: totalGeneral ?? 0,
      dateOrder : form?.dateOrder ? new Date(form.dateOrder) : new Date(),
      state : form?.state ?? 0,
      status : dishOrder?.status ?? 0,
      skipValidation:false,
      tableOccupation: dishOrder?.tableOccupation ?? null,
      details: form.details.map((item): DishOrderDetailsEntity => {
        const dish = dishes.find(d => d.dishID === item.dishID);
      
        return {
          orderDetailsID: item.id ?? null,        
          dish: dish
            ? {
                ...dish,
                skipValidation: true,
              }
            : null,
            
          orderID: dishOrder?.orderID ?? null,
            
          unitPrice: item.unitPrice,
          quantity: item.quantity,
            
          user: {
            userID: item.userID,
          } as UserEntity,
        
          dateOrder: dishOrder?.dateOrder ?? new Date().toISOString(),
        
          state: 0,
          status: 0,
        
          skipValidation: true,
        };
      })

    }
    console.log(body);
    updateDishOrder(body);
    onOpenChange(false);
    onSuccess?.();
  }  
  
  // Récupération des donnees 
  useEffect(() => {
    console.log('Valeur de dishOrder:', dishOrder);
    setForm({
      totalPrice: dishOrder ? dishOrder.totalPrice : 0,
      dateOrder: dishOrder?.dateOrder.toString().split("T")[0] ?? "",
      state: dishOrder?.state ?? 0,
      status: dishOrder?.status ?? 0,
      details: (dishOrder?.details ?? []).map((r) => ({
        id: String(r.orderDetailsID),
        dishID: r.dish?.dishID ?? "",
        unitPrice: r.unitPrice,
        quantity: r.quantity,
        userID: r.user?.userID ?? "",
      })),
    });
  }, [dishOrder]);


  //Liste des plats 
  useEffect(() => {
    console.log('Valeur de dishOrder:',dishOrder);
    const companyID = user?.profil.company.companyID;
    if (!companyID) return;   
    Promise.all([
      getAllDishes(companyID),
    ])
      .then(([dishes]) => {
        setDishes(dishes);
      })
    .catch((error) => console.error("Error fetching options:", error));
  }, []);

  // Ajout de nouveau bloc
  const update = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Fonction ajout de bloc de details
  const updateDetails = (details: DishOrderDetailsItem[]) => {
    update("details", details);
  };

  // Duplication de la liste déroulante 
  const updateDetailItem = (index: number, item: DishOrderDetailsItem) => {
    const newDetails = [...form.details];
    newDetails[index] = item;
    updateDetails(newDetails);
  };

  // Suppression de bloc
  const removeDetailItem = (index: number) => {
    updateDetails(form.details.filter((_, i) => i !== index));
  };
  
  // Total somme
    const totalGeneral = useMemo(
      () =>
        form.details.reduce(
          (sum, d) => sum + (d.unitPrice || 0) * (d.quantity || 0),
          0
        ),
      [form.details]
    );

    return(
    <Dialog open={openEditDishOrder} onOpenChange={onOpenChange}>
        <DialogContent
          className="max-w-[95vw] xl:max-w-[900px] max-h-[90vh] p-0 overflow-hidden flex flex-col rounded-2xl border-none
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
            data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%]
            duration-300 ease-out"
        >
          
          {/* Header */}
          <div className="px-8 py-6 bg-slate-700 text-white shrink-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15">
                <Utensils className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-white text-2xl">
                  Modification de commande
                </DialogTitle>
                <DialogDescription className="text-slate-300 text-base">
                  Vous pouvez modifier les détails de cette commande           
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white flex-1 overflow-y-auto">
            <div className="px-8 py-6 flex flex-col gap-5">

              {/* Formulaire principal */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-slate-500">
                    Total
                  </Label>
                    <div className="h-9 flex items-center px-3 rounded-md bg-slate-100 text-sm font-medium text-slate-700">
                      {formatAriary(totalGeneral)} 
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-slate-600">
                    Etat de la commande
                  </Label>

                  <Select
                    value={state.toString()}
                    onValueChange={(value) => {
                      const newState = Number(value);
                      setState(newState);
                      update("state", newState);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un état" />
                    </SelectTrigger>
                  
                    <SelectContent>
                      {Object.entries(stateLabel).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Section Détails */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <SectionLabel>Détails de la commande</SectionLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1.5 hover:bg-green-600 hover:text-white"
                      onClick={() =>
                        updateDetails([
                          ...form.details,
                          {
                            id: null,
                            dishID: "",
                            unitPrice: 0,
                            quantity: 1,
                            userID: "",
                          },
                        ])
                      }

                    >
                      <Plus className="h-4 w-4" />
                      Ajouter un plat
                    </Button>
                  </div>

                {form.details.length === 0 && (
                  <p className="text-sm text-slate-400 italic py-2">
                    Aucun plat ajouté à cette commande.
                  </p>
                )}

                <div className="flex flex-col gap-2">
                  {form.details.map((detail, index) => {
                    const total = (detail.unitPrice || 0) * (detail.quantity || 0);
                    return (
                      <div
                        key={detail.id ?? `new-${index}`}
                        className="grid grid-cols-10 gap-3 items-end p-3 rounded-lg border border-slate-100 bg-slate-50/50"
                      >
                        {/* Plat */}
                        <div className="col-span-5 flex flex-col gap-1.5">
                          <Label className="text-xs font-medium text-slate-500">
                            Plat
                          </Label>
                          <Select
                            value={detail.dishID}
                            onValueChange={(value) => {
                              const dish = dishes.find((d) => d.dishID === value);
                              updateDetailItem(index, {
                                ...detail,
                                dishID: value,
                                unitPrice: dish?.price?.price ?? detail.unitPrice,
                              });
                            }}
                          >
                            <SelectTrigger className="h-9 bg-white">
                              <SelectValue placeholder="Sélectionner un plat" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key='Aucun' value="Séléctionnez un plat">
                                  Séléctionnez un plat
                                </SelectItem>
                              {dishes.map((dish) => (
                                <SelectItem key={dish.dishID} value={dish.dishID!}>
                                  {dish.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Quantité */}
                        <div className="col-span-2 flex flex-col gap-1.5">
                          <Label className="text-xs font-medium text-slate-500">
                            Quantité
                          </Label>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateDetailItem(index, {
                                  ...detail,
                                  quantity: Math.max(0, detail.quantity - 1),
                                })
                              }
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-red-600 hover:text-white"
                            >
                              <Minus size={14} />
                            </button>
                            
                          <Input
                            type="number"
                            className="h-9 bg-white"
                            value={detail.quantity === 0 ? "" : detail.quantity}
                            onChange={(e) => {
                              const rawValue = e.target.value;
                              const parsed = rawValue === "" ? 0 : parseInt(rawValue, 10);
                            
                              const oldQuantity = detail.quantity;
                              const newQuantity = isNaN(parsed) ? 0 : parsed;
                            
                              const difference = newQuantity - oldQuantity;
                            
                              if (difference > 0) {
                                console.log(`Augmentation de ${difference}`);
                              } else if (difference < 0) {
                                console.log(`Diminution de ${Math.abs(difference)}`);
                              }
                            
                              updateDetailItem(index, {
                                ...detail,
                                quantity: newQuantity,
                              });
                            }}
                          />
                        
                            <button
                              type="button"
                              onClick={() =>
                                updateDetailItem(index, {
                                  ...detail,
                                  quantity: detail.quantity + 1,
                                })
                              }
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>


                        {/* Total par ligne */}
                        <div className="col-span-2 flex flex-col gap-1.5">
                          <Label className="text-xs font-medium text-slate-500">
                            Total
                          </Label>
                          <div className="h-9 flex items-center px-3 rounded-md bg-slate-100 text-sm font-medium text-slate-700">
                            {formatAriary(total)} 
                          </div>
                        </div>

                        {/* Supprimer */}
                        <div className="col-span-1 flex justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-600 hover:text-white"
                            onClick={() => removeDetailItem(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total général */}

              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
            <Button 
              variant="outline" 
              className="transition-all duration-200 hover:bg-red-600 hover:text-white"
              onClick={() => onOpenChange(false)} 
            >
              Annuler
            </Button>
            <Sbutton 
              message={"Modification réussie!"}  
              formAction={handleSubmit}  
              className="transition-all duration-200 hover:bg-gray-700 hover:text-white"/>
          </div>

        </DialogContent>
      </Dialog>   
    );
}