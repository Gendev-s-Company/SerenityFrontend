"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Hotel,
  UtensilsCrossed,
  Sparkles,
  Plus,
  Trash2,
} from "lucide-react";
import { getLocalStorage } from "@/utils/storage";
import { getAllRoom } from "@/infrastructure/hotel/room/roomRequest";
import { getAllActivity } from "@/infrastructure/hotel/activity/activityRequest";
import { getAllDishes } from "@/infrastructure/restaurant/dish/dishRequest";
import { RoomEntity } from "@/types/entity-type/roomEntity";
import { ActivityEntity } from "@/types/entity-type/activityEntity";
import { DishEntity } from "@/types/entity-type/dishEntity";
import { createPack, updatePack } from "@/infrastructure/pack/packRequest";
import { PackEntity } from "@/types/entity-type/packEntity";
import Sbutton from "@/components/button/Sbutton";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HotelItem {
  id: string;
  roomId: string;
  duration: string;
}

interface RestaurantItem {
  id: string;
  dishId: string;
  quantity: string;
}

interface ActivityItem {
  id: string;
  activityId: string;
  duration: string;
}

interface PackFormData {
  title: string;
  discount: string;
  startDate: string;
  endDate: string;
  hotelItems: HotelItem[];
  restaurantItems: RestaurantItem[];
  activityItems: ActivityItem[];
}

// ─── Mock data — remplacez par vos vrais appels API ───────────────────────────

// const ROOMS = [
//   { id: "R001", label: "Chambre Deluxe" },
//   { id: "R002", label: "Suite Présidentielle" },
//   { id: "R003", label: "Chambre Standard" },
// ];

// const DISHES = [
//   { id: "D001", label: "Menu Gastronomique" },
//   { id: "D002", label: "Brunch du Dimanche" },
//   { id: "D003", label: "Dégustation de vins" },
// ];

// const ACTIVITIES = [
//   { id: "A001", label: "Spa & Bien-être" },
//   { id: "A002", label: "Excursion en mer" },
//   { id: "A003", label: "Cours de cuisine" },
// ];




function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
      {children}
    </p>
  );
}

function AddRowButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 w-full rounded-lg border border-dashed border-slate-300
                 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 hover:bg-white hover:border-slate-400
                 hover:text-slate-700 transition-colors"
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}

// ─── Hotel tab ────────────────────────────────────────────────────────────────

function HotelTab({
  items,
  rooms,           
  onChange,
}: {
  items: HotelItem[];
  rooms: RoomEntity[]; 
  onChange: (items: HotelItem[]) => void;
}) {
  const add = () =>
    onChange([
      ...items,
      { id: crypto.randomUUID(), roomId: "", duration: "" },
    ]);

  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));

  const update = (id: string, field: keyof HotelItem, value: string) =>
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));


  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Chambres incluses</SectionLabel>

      {items.map((item, idx) => (
        <div
          key={item.id}
          className="rounded-lg border border-slate-200 bg-slate-50 p-3 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              #{idx + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(item.id)}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-slate-500">Chambre</Label>
              <Select
                value={item.roomId}
                onValueChange={(v) => update(item.id, "roomId", v)}
              >
                <SelectTrigger className="h-9 text-sm bg-white">
                  <SelectValue placeholder="Sélectionner…" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((r) => (
                    <SelectItem key={r.roomID} value={r.roomID!}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-slate-500">Durée (nuits)</Label>
              <Input
                type="number"
                min={1}
                placeholder="Ex. 2"
                className="h-9 text-sm bg-white"
                value={item.duration}
                onChange={(e) => update(item.id, "duration", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <AddRowButton onClick={add} label="Ajouter une chambre" />
    </div>
  );
}

// ─── Restaurant tab ───────────────────────────────────────────────────────────

function RestaurantTab({
  items,
  dishes,
  onChange,
}: {
  items: RestaurantItem[];
  dishes: DishEntity[];
  onChange: (items: RestaurantItem[]) => void;
}) {
  const add = () =>
    onChange([
      ...items,
      { id: crypto.randomUUID(), dishId: "", quantity: "" },
    ]);

  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));

  const update = (id: string, field: keyof RestaurantItem, value: string) =>
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Plats inclus</SectionLabel>

      {items.map((item, idx) => (
        <div
          key={item.id}
          className="rounded-lg border border-slate-200 bg-slate-50 p-3 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              #{idx + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(item.id)}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-slate-500">Plat / Menu</Label>
              <Select
                value={item.dishId}
                onValueChange={(v) => update(item.id, "dishId", v)}
              >
                <SelectTrigger className="h-9 text-sm bg-white">
                  <SelectValue placeholder="Sélectionner…" />
                </SelectTrigger>
                <SelectContent>
                  {dishes.map((d) => (
                    <SelectItem key={d.dishID} value={d.dishID!}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-slate-500">Quantité</Label>
              <Input
                type="number"
                min={1}
                placeholder="Ex. 1"
                className="h-9 text-sm bg-white"
                value={item.quantity}
                onChange={(e) => update(item.id, "quantity", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <AddRowButton onClick={add} label="Ajouter un plat" />
    </div>
  );
}

// ─── Activities tab ───────────────────────────────────────────────────────────

function ActivitiesTab({
  items,
  activities,
  onChange,
}: {
  items: ActivityItem[];
  activities: ActivityEntity[];
  onChange: (items: ActivityItem[]) => void;
}) {
  const add = () =>
    onChange([
      ...items,
      { id: crypto.randomUUID(), activityId: "", duration: "" },
    ]);

  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));

  const update = (id: string, field: keyof ActivityItem, value: string) =>
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Activités incluses</SectionLabel>

      {items.map((item, idx) => (
        <div
          key={item.id}
          className="rounded-lg border border-slate-200 bg-slate-50 p-3 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              #{idx + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(item.id)}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-slate-500">Activité</Label>
              <Select
                value={item.activityId}
                onValueChange={(v) => update(item.id, "activityId", v)}
              >
                <SelectTrigger className="h-9 text-sm bg-white">
                  <SelectValue placeholder="Sélectionner…" />
                </SelectTrigger>
                <SelectContent>
                  {activities.map((a) => (
                    <SelectItem key={a.activityID} value={a.activityID!}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-slate-500">Durée (heures)</Label>
              <Input
                type="number"
                min={1}
                placeholder="Ex. 3"
                className="h-9 text-sm bg-white"
                value={item.duration}
                onChange={(e) => update(item.id, "duration", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <AddRowButton onClick={add} label="Ajouter une activité" />
    </div>
  );
}



interface PackDialogProps {
  openPacks: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: PackFormData) => void;
  packToEdit?: PackEntity | null;
  onSuccess?: () => void;  
}

export function AddPackDetails({ 
  openPacks, 
  onOpenChange, 
  packToEdit,
  onSuccess

 }: PackDialogProps) {
  const user = getLocalStorage();
  const [rooms,setRooms] = useState<RoomEntity[]>([]);
  const [activities, setActivities] = useState<ActivityEntity[]>([]);
  const [dishes,setDishes]=useState<DishEntity[]>([]);
  
  // Corps du formulaire
  const [form, setForm] = useState<PackFormData>({
    title: "",
    discount: "",
    startDate: "",
    endDate: "",
    hotelItems: [],
    restaurantItems: [],
    activityItems: [],
  });

  // Reinitialise le formulaire
  const resetForm = () => {
    setForm({
      title: "",
      discount: "",
      startDate: "",
      endDate: "",
      hotelItems: [],
      restaurantItems: [],
      activityItems: [],
    });
  };

  const update = (field: keyof PackFormData, value: PackFormData[typeof field]) =>
    setForm((prev) => ({ ...prev, [field]: value }));


    // Creation /modification de pack
    // const handleSubmit = async () => {
    //   const body: PackEntity = {
    //     packID: packToEdit?.packID ?? null,  // ← l'ID existant pour l'update
    //     companyID: user?.profil?.company.companyID!,
    //     title: form.title,
    //     discount: Number(form.discount),
    //     startDate: form.startDate ? new Date(form.startDate) : new Date(),
    //     endDate: form.endDate ? new Date(form.endDate) : new Date(),
    //     status: 0,
    //     skipValidation: false,
    //     hotelsPack: form.hotelItems.map((item) => ({
    //       roomID: item.roomId,
    //       duration: Number(item.duration),
    //     })),
    //     activityPack:form.activityItems.map((item) => ({
    //       activityID: item.activityId,
    //       duration: Number(item.duration),
    //     })),
    //     restoPack: form.restaurantItems.map((item) => ({
    //       dishID: item.dishId,
    //       duration: Number(item.quantity),
    //     })),
    //   };
    
    //   if (packToEdit) {
    //     await updatePack(body);   // ← update
    //   } else {
    //     await createPack(body);   // ← create
    //   }
    
    //   // setRefresh((prev) => prev + 1);
    //   resetForm();
    //   onOpenChange(false);
    // };

    const handleSubmit = async () => {
      try{

        const body: PackEntity = {
          packID: null,
          companyID: user?.profil?.company.companyID!,
          title: form.title,
          discount: Number(form.discount) ?? 0,
          startDate: form.startDate ? new Date(form.startDate) : new Date(),
          endDate: form.endDate ? new Date(form.endDate) : new Date(),
          status: 0,
          skipValidation: false,
        
          hotelsPack: form.hotelItems.map((item) => ({
            id: null,
            roomID: item.roomId,
            duration: Number(item.duration) ?? 0,
            status: 0,
            skipValidation: true,
          })),
        
          activityPack: form.activityItems.map((item) => ({
            id: null,
            activityID: item.activityId,
            duration: Number(item.duration) ?? 0,
            status: 0,
            skipValidation: true,
          })),
        
          restoPack: form.restaurantItems.map((item) => ({
            id: null,
            dishID: item.dishId,
            quantity: Number(item.quantity) ?? 0,
            status: 0,
            skipValidation: true,
          })),
        };
      
        await createPack(body);
        resetForm();
        onOpenChange(false);
        onSuccess?.();
        
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      }
    };

    // si c'est en mode modification
    useEffect(() => {
      if (packToEdit) {
        setForm({
          title: packToEdit.title,
          discount: String(packToEdit.discount),
          startDate: packToEdit.startDate?.toString().split("T")[0] ?? "",
          endDate: packToEdit.endDate?.toString().split("T")[0] ?? "",
          hotelItems: (packToEdit.hotelsPack ?? []).map((h) => ({
            id: crypto.randomUUID(),
            roomId: h.roomID,
            duration: String(h.duration),
          })),
          restaurantItems: (packToEdit.restoPack ?? []).map((r) => ({
            id: crypto.randomUUID(),
            dishId: r.dishID,
            quantity: String(r.quantity),
          })),
          activityItems: (packToEdit.activityPack ?? []).map((a) => ({
            id: crypto.randomUUID(),
            activityId: a.activityID,
            duration: String(a.duration),
          })),
        });
      } else {
        resetForm(); // mode création → formulaire vide
      }
    }, [packToEdit]);


    // Listes des chambres,plats, et activités
  useEffect(() => {
      const companyID = user?.profil.company.companyID;
      if (!companyID) return;   
      Promise.all([
        getAllRoom(companyID),
        getAllActivity(companyID),
        getAllDishes(companyID),
      ])
        .then(([room,activities,dishes]) => {
          setRooms(room);
          setActivities(activities);
          setDishes(dishes);
        })
      .catch((error) => console.error("Error fetching options:", error));
  }, []);



  return (
    <Dialog open={openPacks} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] xl:max-w-[900px] max-h-[90vh] p-0 overflow-hidden flex flex-col">

        <Tabs defaultValue="hotel" className="flex flex-col flex-1 overflow-hidden">

          {/* ── Header slate-700 ── */}
          <div className="px-8 py-6 bg-slate-700 text-white shrink-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-white text-2xl">
                  Création de pack
                </DialogTitle>
                <DialogDescription className="text-slate-300 text-base">
                  Vous pouvez ajouter des avantages à inclure dans ce pack
                </DialogDescription>
              </div>
            </div>

            <TabsList className="w-full bg-transparent gap-1 h-auto p-0">
              {[
                { value: "hotel", icon: <Hotel className="h-4 w-4" />, label: "Hôtel" },
                { value: "restaurant", icon: <UtensilsCrossed className="h-4 w-4" />, label: "Restaurant" },
                { value: "activites", icon: <Sparkles className="h-4 w-4" />, label: "Activités" },
              ].map(({ value, icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex-1 gap-2 text-slate-300 rounded-none rounded-t-lg border-b-2 border-transparent
                             data-[state=active]:text-white data-[state=active]:bg-white/10
                             data-[state=active]:border-white font-medium"
                >
                  {icon}
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* ── Body ── */}
          <div className="bg-white flex-1 overflow-y-auto">
            <div className="px-8 py-6 flex flex-col gap-5">

              {/* Formulaire principal */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pack-title" className="text-sm font-medium text-slate-600">
                    Titre du pack
                  </Label>
                  <Input
                    id="pack-title"
                    placeholder="Ex. Pack séjour"
                    className="h-10"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="pack-discount" className="text-sm font-medium text-slate-600">
                      Remise (%)
                    </Label>
                    <Input
                      id="pack-discount"
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Ex. 15"
                      className="h-10"
                      value={form.discount}
                      onChange={(e) => update("discount", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="pack-startdate" className="text-sm font-medium text-slate-600">
                      Date de début
                    </Label>
                    <Input
                      id="pack-startdate"
                      type="date"
                      className="h-10"
                      value={form.startDate}
                      onChange={(e) => update("startDate", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="pack-enddate" className="text-sm font-medium text-slate-600">
                      Date de fin
                    </Label>
                    <Input
                      id="pack-enddate"
                      type="date"
                      className="h-10"
                      value={form.endDate}
                      onChange={(e) => update("endDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Contenu des tabs */}

              {/* Hotel */}
            <TabsContent value="hotel" className="mt-0">
              <HotelTab
                items={form.hotelItems}
                rooms={rooms}                          
                onChange={(v) => update("hotelItems", v)}
              />
            </TabsContent>

              {/* Restaurant */}
              <TabsContent value="restaurant" className="mt-0">
                <RestaurantTab
                  items={form.restaurantItems}
                  dishes={dishes}                        
                  onChange={(v) => update("restaurantItems", v)}
                />
              </TabsContent>

              {/* Activité */}
              <TabsContent value="activites" className="mt-0">
                <ActivitiesTab
                  items={form.activityItems}
                  activities={activities}                
                  onChange={(v) => update("activityItems", v)}
                />
              </TabsContent>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="px-8 py-4 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Sbutton message={packToEdit ?"Modification réussie!":"Création réussi!"}  formAction={handleSubmit} />
          </div>

        </Tabs>
      </DialogContent>
    </Dialog>
  );
}