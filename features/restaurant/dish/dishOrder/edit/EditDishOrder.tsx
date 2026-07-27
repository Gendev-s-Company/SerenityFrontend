"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DishOrderEntity } from "@/types/entity-type/dishOrderEntity";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Plus, Trash2, Utensils } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/label/SectionLabel";
import Sbutton from "@/components/button/Sbutton";
import { getLocalStorage } from "@/utils/storage";
import { DishEntity } from "@/types/entity-type/dishEntity";
import { getAllDishes } from "@/infrastructure/restaurant/dish/dishRequest";
import { formatAriary } from "@/lib/invoice-data";
import { updateDishOrder } from "@/infrastructure/restaurant/dish/dishOrder/dishOrderRequest";

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
  details:DishOrderDetailsItem[],
}

// Propriétés du composant
interface EditDishOrderProps{
    openEditDishOrder: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: (data:DishOrderFormData) => void;
    onSuccess?:() => void;
    dishOrder?: DishOrderEntity | null,
}

// Composant
export default function EditDishOrder({
  openEditDishOrder,
  onOpenChange,
  dishOrder,
  }: 
  EditDishOrderProps){
  const user = getLocalStorage();  
  const [dishes,setDishes]=useState<DishEntity[]>([]);
  
  const [form, setForm] = useState<DishOrderFormData>({
       totalPrice: 0,
       dateOrder:"",
       details:[] as DishOrderDetailsItem[] ,
    });

  const handleSubmit = (formData: DishOrderEntity) =>{
    updateDishOrder(formData);
  }  
  
  // Récupération des donnees 
  useEffect(() => {
    console.log('Valeur de dishOrder:', dishOrder);
    setForm({
      totalPrice: dishOrder ? dishOrder.totalPrice : 0,
      dateOrder: dishOrder?.dateOrder.toString().split("T")[0] ?? "",
      details: (dishOrder?.details ?? []).map((r) => ({
        id: String(r.orderDetailsID),
        dishID: r.dish?.dishID ?? "",
        unitPrice: r.unitPrice,
        quantity: r.quantity,
        userID: r.user.userID ?? "",
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

  // Fonction ajout de details
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
      (dishOrder?.totalPrice ?? 0) +
      form.details.reduce(
        (sum, d) => sum + (d.unitPrice || 0) * (d.quantity || 0),
        0
      ),
    [form.details, dishOrder]
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
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pack-title" className="text-sm font-medium text-slate-600">
                    Date de commande
                  </Label>
                  <Input
                    type="date"
                    id="pack-title"
                    placeholder="Date commande"
                    className="h-10"
                    value={form.dateOrder}
                    onChange={(e) => update("dateOrder", e.target.value)}
                  />
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
                            userID: "", // à adapter selon ton contexte
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
                        className="grid grid-cols-12 gap-3 items-end p-3 rounded-lg border border-slate-100 bg-slate-50/50"
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
                           <Input
                            type="number"
                            className="h-9 bg-white"
                            value={detail.quantity === 0 ? "" : detail.quantity}
                            onChange={(e) => {
                              const rawValue = e.target.value;
                              const parsed = rawValue === "" ? 0 : parseInt(rawValue, 10);
                              updateDetailItem(index, {
                                ...detail,
                                quantity: isNaN(parsed) ? 0 : parsed,
                              });
                            }}
                          />
                        </div>

                        {/* Prix unitaire prédéfini */}

                        {/* Total ligne */}
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
                {form.details.length > 0 && (
                  <div className="flex justify-end pt-2">
                    <div className="text-sm font-medium text-slate-700">
                      Total général :{" "}
                      <span className="text-slate-900">
                      {formatAriary(totalGeneral)}{" "}

                      </span>
                    </div>
                  </div>
                )}
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
              formAction={() => handleSubmit}  
              className="transition-all duration-200 hover:bg-gray-700 hover:text-white"/>
          </div>

        </DialogContent>
      </Dialog>   
    );
}