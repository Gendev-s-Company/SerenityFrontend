"use client"

import React, { useEffect ,useMemo,useRef,useState} from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getLocalStorage } from "@/utils/storage";
import {getAllDisponibility} from "@/infrastructure/hotel/room/roomRequest"
import { DisponibilityEntity} from "@/types/entity-type/roomEntity";
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Search } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field"
import { dateToBackend, timestampToText } from "@/utils/Util"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Indicateur d'etat des chambres
const roomstateStyles: Record<number, string> = {
  0: "bg-green-500",     // Libre
  1: "bg-yellow-400",    // Réservation non validée
  2: "bg-blue-500",      // Réservation validée 
  3: "bg-red-600",       // Occupée sans réservation 
  4: "bg-orange-500",    // Occupée avec réservation 
  5: "bg-gray-500",      // Fini avec réservation 
  6: "bg-gray-400",      // Fini sans réservation  clair
  7: "bg-purple-500",    // Payé mais absent 
}

const reservationStateLabels: Record<number, string> = {
  0: "Disponible",
  1: "Réservation non validée",
  2: "Réservation validée",
  3: "Occupée (sans réservation)",
  4: "Occupée (avec réservation)",
  5: "Fini (avec réservation)",
  6: "Fini (sans réservation)",
  7: "Payé mais absent",
  8:"Annulé"
}

export default function Disponibilite() {
  const user = getLocalStorage()!;
  const getNow = () => dateToBackend(new Date().toISOString());
  const [starttime, setStarttime] = useState(getNow());
  const [endtime, setEndtime] = useState(getNow());
  const [state, setState] = useState<number[]>([0]);
  const [type, setType] = useState<string>('global');
  const [appliedFilters, setAppliedFilters] = useState({
    state: [] as number[],
    start: starttime,
    end: endtime,
    mode: 0
  });
  const [disponibilite, setDisponibilite]= useState<DisponibilityEntity[]>([]);
  const [selectedMode,setSelectedMode]=useState<number>(0);
  const [isApplied, setIsApplied] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<DisponibilityEntity | null>(null);
  // Pour le modal des checkbox en mode détaillé
  const [open, setOpen] = useState(false)


  // MODE GLOBAL OU DETAILLE
const options =
  selectedMode === 0
    ? [
        { value: "0", label: "Libre" },
        { value: "1", label: "Occupé" },
      ]
    : [
        { value: "0", label: "Libre" },
        { value: "1", label: "Réservation non validée" },
        { value: "2", label: "Réservation validée" },
        { value: "3", label: "Occupé (Sans réservation)" },
        { value: "4", label: "Occupé (Avec réservation)" },
        { value: "5", label: "Fini (Avec réservation)" },
        { value: "6", label: "Fini (Sans réservation)" },
        { value: "7", label: "Absent (réservation validée)" },
];

const legendItems =
  selectedMode === 0
    ? [
        { color: "bg-green-500", label: "Libre" },
        { color: "bg-red-600", label: "Occupée" },
      ]
    : [
        { color: "bg-green-500", label: "Libre" },
        { color: "bg-yellow-400", label: "Réservation non validée" },
        { color: "bg-blue-500", label: "Réservation validée" },
        { color: "bg-red-600", label: "Occupée sans réservation" },
        { color: "bg-orange-500", label: "Occupée avec réservation" },
        { color: "bg-gray-500", label: "Fini avec réservation" },
        { color: "bg-gray-400", label: "Fini sans réservation" },
        { color: "bg-purple-500", label: "Payé mais absent" },
        { color: "bg-red-500", label: "Annulé" },
];


  const fetchDisponibilite = (
    state: number[],
    start: string,
    end: string
  ) => {
    if (user && user.profil.company.companyID) {
      getAllDisponibility(
        user.profil.company.companyID,
        state,
        start,
        end,
        type
      )
        .then((data) => {
          setDisponibilite(data)
          console.log(data);
        })
        .catch((error) => console.error(error))
    }
  }

    const filteredRooms = useMemo(() => {
      return disponibilite.filter(room => {
        const { state } = appliedFilters;
      
        return state.includes(room.reservation_state);
      });
    }, [disponibilite, appliedFilters]);

  useEffect(() => {
    if (selectedMode === 0 || (selectedMode === 1 && !isApplied)) {
      setState([0]);
    }
  
    fetchDisponibilite(
      appliedFilters.state,
      appliedFilters.start,
      appliedFilters.end
    );
  }, [appliedFilters, selectedMode, isApplied]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-200 p-6">

      {/* HEADER */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Gestion des disponibilités
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Consultez et filtrez l'état des chambres en temps réel
        </p>
      </div>

      {/* Filtre */}
        <Card className="mb-8 w-full max-w-5xl shadow-md border-0">
          <CardContent className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Date début */}
              <Field className="flex flex-col">
                <FieldLabel htmlFor="start">Date début</FieldLabel>
                <Input
                  id="start"
                  type="datetime-local"
                  value={starttime}
                  onChange={(e) => setStarttime(e.target.value)}
                />
              </Field>

              {/* Date fin */}
              <Field className="flex flex-col">
                <FieldLabel htmlFor="end">Date fin</FieldLabel>
                <Input
                  id="end"
                  type="datetime-local"
                  value={endtime}
                  onChange={(e) => setEndtime(e.target.value)}
                />
              </Field>

              {/* MultiSelect */}
              <div className="flex flex-col">
              <Field className="flex flex-col">
                <FieldLabel>Etat</FieldLabel>

                {/* MODE GLOBAL */}
                {selectedMode === 0 ? (
                  <Select
                    value={state[0].toString()}
                    onValueChange={(value) => setState([Number(value)])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un état" />
                    </SelectTrigger>
                
                    <SelectContent>
                      {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  /* MODE DETAILLE */     
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setOpen(true)}
                        title={
                          options
                            .filter((opt) => state.includes(Number(opt.value)))
                            .map((opt) => opt.label)
                            .join(", ")
                        } // 👈 tooltip complet
                        className="justify-start max-w-[250px] truncate text-left"
                      >
                        {state.length > 0
                          ? (() => {
                              const labels = options
                                .filter((opt) => state.includes(Number(opt.value)))
                                .map((opt) => opt.label)
                          
                              return labels.length > 2
                                ? labels.slice(0, 2).join(", ") + "..."
                                : labels.join(", ")
                            })()
                          : "Choisir les états"}
                      </Button>
                          
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Choisir les états</DialogTitle>
                          </DialogHeader>
                          
                          <DialogDescription>
                            Détails des états
                          </DialogDescription>
                          
                          <div className="space-y-3 mt-4">
                            {options.map((opt) => (
                              <div key={opt.value} className="flex items-center gap-2">
                                <Checkbox
                                  checked={state.includes(Number(opt.value))}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setState([...state, Number(opt.value)])
                                    } else {
                                      setState(state.filter((s) => s !== Number(opt.value)))
                                    }
                                  }}
                                />
                                <span>{opt.label}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-end mt-4">
                            <Button onClick={() => setOpen(false)}>
                              Valider
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                )}
              </Field>
              </div>

              <Field className="flex flex-col">
                <FieldLabel htmlFor="etat">Type</FieldLabel>
                  <Select
                    value={type}
                    onValueChange={(value) => setType(value)}                  
                    >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un type" />
                    </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="global">Global</SelectItem>
                        <SelectItem value="detaille">Détaillé</SelectItem>
                      </SelectContent>
                  </Select>
              </Field>
            </div>
            <div className="flex items-end justify-between mt-6">
                                
              {/* Mode à gauche */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Mode</span>
                                
                <Switch
                  className="scale-90"
                  checked={selectedMode === 1}
                  onCheckedChange={(checked) => setSelectedMode(checked ? 1 : 0)}
                />
            
                <span className="text-sm">
                  {selectedMode === 0 ? "Global" : "Détaillé"}
                </span>
              </div>
                                
              {/* Bouton à droite */}
              <Button
                className="flex items-center gap-2 px-6 cursor-pointer"
                onClick={() => {
                  let stateArray: number[];
                
                  if (selectedMode === 0) {
                    stateArray =
                      state[0] === 0 ? [0] : [1, 2, 3, 4, 5, 6, 7,8];
                  } else {
                    stateArray = state;
                  }
                
                  setAppliedFilters({
                    state: stateArray,
                    start: starttime,
                    end: endtime,
                    mode: selectedMode
                  });
                
                  setIsApplied(true);
                }}
              >
                <Search className="w-4 h-4" />
                Afficher
              </Button>
            </div>
              
          </CardContent>
        </Card>

      <div className="flex flex-col items-center w-full max-w-6xl">

        {/* LEGENDE */}
        <div className="mb-6 bg-white px-4 py-3 rounded-xl shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">

            {legendItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 border"
              >
                <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <span className="text-xs text-gray-700 truncate">
                  {item.label}
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* GRID DES CHAMBRES */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
            {filteredRooms.map((room) => {
              const isOccupied = (state: number) => state !== 0;
            
              const displayColor =
                selectedMode === 0
                  ? isOccupied(room.reservation_state)
                    ? "bg-red-600"
                    : "bg-green-500"
                  : roomstateStyles[room.reservation_state];
            
              const displayLabel =
                selectedMode === 0
                  ? isOccupied(room.reservation_state)
                    ? "Occupé"
                    : "Libre"
                  : reservationStateLabels[room.reservation_state];
            
              return (
                <TooltipProvider key={room.roomID}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        onClick={() => setSelectedRoom(room)}
                        className={`text-white text-sm font-semibold grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] h-[80px] flex items-center justify-center text-center shadow-md cursor-pointer hover:scale-105 transition-transform ${displayColor}`}
                      >
                        <div>
                          {room.name} <br />
                          {displayLabel}
                        </div>
                      </div>
                    </TooltipTrigger>
              
                    <TooltipContent>
                      <p>
                        ID : {room.roomID} <br />
                        Chambre : {room.name} <br />
                        Réservation : {displayLabel}
                        {type !== 'global' && (
                          <>
                            <br />
                            Départ : {room.actual_departure ? timestampToText(room.actual_departure) :"Non défini" } <br />
                            Arrivée : {room.actual_arrival ? timestampToText(room.actual_arrival) :"Non défini"} <br />
                            Jour : {timestampToText(room.day)}
                          </>
                        )}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
        </div>
          {selectedRoom && selectedMode === 1 && (
            <Dialog open={true} onOpenChange={() => setSelectedRoom(null)}>
              <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden" aria-description="room-content">


                {/* HEADER */}
                <div className={`p-5 text-white flex justify-between items-start ${
                  roomstateStyles[selectedRoom.reservation_state]
                }`}>
                  <div>
                    <h2 className="text-xl font-bold">
                      <DialogHeader>
                        <DialogTitle>{selectedRoom.name}</DialogTitle>
                            <DialogDescription>
                              Détails de la reservation
                            </DialogDescription>
                      </DialogHeader>
                    </h2>
                    <p className="text-sm opacity-90">
                      {reservationStateLabels[selectedRoom.reservation_state]}
                    </p>
                  </div>
                </div>              

                {/* BODY */}
                <div className="p-6 space-y-6 bg-white">              

                  {/* ID */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Identifiant</span>
                    <span className="font-semibold text-gray-800">
                      {selectedRoom.roomID}
                    </span>
                  </div>              

                  {/* État badge */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">État</span>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full text-white ${
                        roomstateStyles[selectedRoom.reservation_state]
                      }`}
                    >
                      {reservationStateLabels[selectedRoom.reservation_state]}
                    </span>
                  </div>              

                  {/* PÉRIODE */}
                  <div className="bg-gray-50 rounded-xl p-4 border space-y-3">              

                    <h3 className="text-sm font-semibold text-gray-600">
                      Période de réservation
                    </h3>             

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Début</span>
                      <span className="font-medium text-gray-800">
                        {timestampToText(appliedFilters.start)}
                      </span>
                    </div>              

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Fin</span>
                      <span className="font-medium text-gray-800">
                        {timestampToText(appliedFilters.end)}
                      </span>
                    </div>              

                  </div>              

                  {/* ACTION */}
                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={() => setSelectedRoom(null)}
                      className="rounded-lg px-5"
                    >
                      Fermer
                    </Button>
                  </div>              

                </div>
              </DialogContent>
            </Dialog>
          )}
      </div>
    </div>
  )
}