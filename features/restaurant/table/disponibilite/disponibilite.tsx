"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { dateToBackend, formatDateFR, generateDateRange, normalizeDateKey, timestampToText } from "@/utils/Util";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DisponibilityEntity } from "@/types/entity-type/restauranTableEntity";
import { getLocalStorage } from "@/utils/storage";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getAllDisponibility } from "@/infrastructure/restaurant/table/restauranttable/restaurantTableRequest";

// Indicateur d'etat des tables
const tablestateStyles: Record<number, string> = {
  9: "bg-gray-300",     // Aucune donnée
  0: "bg-green-500",     // Libre
  1: "bg-yellow-400",    // Réservation non validée
  2: "bg-blue-500",      // Réservation validée 
  3: "bg-red-600",       // Occupée sans réservation 
  4: "bg-orange-500",    // Occupée avec réservation 
  5: "bg-gray-500",      // Fini avec réservation 
  6: "bg-gray-400",      // Fini sans réservation  clair
  7: "bg-purple-500",    // Payé mais absent 
  8: "bg-red-500",    // Payé mais absent
}

const reservationStateLabels: Record<number, string> = {
  9: "Aucune donnée",
  0: "Disponible",
  1: "Réservation non validée",
  2: "Réservation validée",
  3: "Occupée (sans réservation)",
  4: "Occupée (avec réservation)",
  5: "Fini (avec réservation)",
  6: "Fini (sans réservation)",
  7: "Payé mais absent",
  8: "Annulé"
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
    const [appliedType, setAppliedType] = useState<string>('global');
    const [disponibilite, setDisponibilite] = useState<DisponibilityEntity[]>([]);
    const [selectedMode, setSelectedMode] = useState<number>(0);
    const [isApplied, setIsApplied] = useState(false);
    const [selectedTable, setSelectedTable] = useState<DisponibilityEntity | null>(null);
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
        { value: "8", label: "Annulé" },
      ];

    const legendItems =
    selectedMode === 0
      ? [
        { color: "bg-green-500", label: "Libre" },
        { color: "bg-red-600", label: "Occupée" },
      ]
      : [
        { color: "bg-gray-300", label: "Aucune donnée" },
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
      end: string,
      type: string
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
          })
          .catch((error) => console.error(error))
      }
    }

    const filteredTables = useMemo(() => {
      return disponibilite.filter(table => {
        const { state } = appliedFilters;
    
        return state.includes(table.reservation_state);
      });
    }, [disponibilite, appliedFilters]);


    const tablesGroupedById = filteredTables.reduce((acc, table) => {
      const key = table.tableID;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(table);
      return acc;
    }, {} as Record<string, DisponibilityEntity[]>);

    const dates = generateDateRange(appliedFilters.start, appliedFilters.end);
    
    const allTablesGrouped = disponibilite.reduce((acc, table) => {
      const key = table.tableID;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(table);
      return acc;
    }, {} as Record<string, DisponibilityEntity[]>);

    useEffect(() => {
    if (selectedMode === 0 || (selectedMode === 1 && !isApplied)) {
      setState([0]);
    }

    fetchDisponibilite(
      appliedFilters.state,
      appliedFilters.start,
      appliedFilters.end,
      appliedType
    );

    }, [appliedFilters, isApplied, appliedType])

  return (
    <div className="flex flex-col items-center min-h-screen bg-white-200 p-6">
        {/* HEADER */}
        <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Gestion des disponibilités des tables
            </h1>
                <p className="text-gray-500 text-sm mt-1">
                Consultez et filtrez l&apos;état des tables en temps réel
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
                      } // tooltip complet
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
                    state[0] === 0 ? [0,5,6,8] : [1, 2, 3, 4, 7];
                } else {
                  stateArray = state;
                  // Si l'état 1 est sélectionné, ajouter aussi les états 5 et 6
                  if (stateArray.includes(0)) {
                    stateArray = [...new Set([...stateArray, 5, 6])];
                  }
                }

                setAppliedType(type);
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
        </div>

        {/* GRID DES TABLES */}
        <div className="bg-gray-50 p-6 rounded-lg w-full max-w-5xl">
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Résultats pour la plage de dates sélectionnée
              </p>
            </div>
        {filteredTables.length <= 0 && 
         <div className="flex items-center justify-center h-[250px] border border-dashed rounded-lg text-gray-400 font-medium">
            <span>Aucune table trouvée pour les états recherchés</span>
         </div>}
        {appliedType === 'global' ? (
            <div className="flex flex-col gap-8 w-full">
            {/* <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4"> */}
            <div className="flex flex-col gap-2">

              {/* Conteneur horizontal pour les jours/états de cette table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                {Object.entries(tablesGroupedById).map(([tableId, tableStates]) => {
                  // On récupère le nom de la table  depuis le premier élément du groupe
                  const tableName = tableStates[0]?.table_name || tableStates[0]?.table_name;

                  return (
                    <div key={tableId}>
                      {tableStates.map((table, index) => {
                        const isOccupied = (state: number) => state !== 0 && state !== 5 && state !== 6 && state !== 8;
                        const findColor = (state: number) => !isOccupied(state) ? "bg-green-500" : tablestateStyles[state];
                        const setLabel = (state: number) => !isOccupied(state) ? "Disponible" : reservationStateLabels[state];

                        const displayColor = findColor(table.reservation_state);
                        const displayLabel = setLabel(table.reservation_state);
                        const name = table?.table_name ? table.table_name : table.table_name;

                        return (
                          <TooltipProvider key={`${tableId}-${index}`}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  onClick={() => setSelectedTable(table)}
                                  className={`text-white text-[12px] leading-tight font-semibold h-[80px] flex items-center justify-center text-center shadow-sm cursor-pointer hover:scale-105 transition-transform rounded-md ${displayColor}`}
                                >
                                  <div>
                                    {/* On affiche le jour ici car le nom est déjà en titre de ligne */}
                                    {table.day ? new Date(table.day).toLocaleDateString() : name} <br />
                                    <span className="opacity-80 font-normal">{displayLabel}</span>
                                  </div>
                                </div>
                              </TooltipTrigger>

                              <TooltipContent>
                                <p>
                                  ID : {table.tableID} <br />
                                  Table : {name} <br />
                                  Réservation : {displayLabel}
                                  {type !== 'global' && (
                                    <>
                                      <br />
                                      Arrivée : {table.actual_arrival ? timestampToText(table.actual_arrival) : "Non défini"} <br />
                                      Départ : {table.actual_departure ? timestampToText(table.actual_departure) : "Non défini"} <br />
                                      Jour : {timestampToText(table.day)}
                                    </>
                                  )}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        ) : (
          <div className="overflow-x-auto overflow-y-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] w-full border border-gray-300 rounded-lg">
            <table className="table-auto border-collapse border border-gray-300 w-full text-xs sm:text-sm">
                  
              <thead className="sticky top-0 z-10">
                <tr>
                  <th className="border border-gray-300 p-1 sm:p-2 bg-gray-100 font-semibold sticky left-0 z-20 min-w-[80px] sm:min-w-[120px] lg:min-w-[150px]">
                    Table
                  </th>
                  
                  {dates.map(date => (
                    <th
                      key={date}
                      className="border border-gray-300 p-1 sm:p-2 bg-gray-100 text-xs sm:text-sm font-semibold whitespace-nowrap min-w-[30px] sm:min-w-[40px]"
                    >
                      {formatDateFR(date)}
                    </th>
                  ))}
                </tr>
              </thead>
                
              <tbody>
                {Object.entries(allTablesGrouped).map(([tableID, tables]) => {
                  const tableName = tables[0]?.table_name || tableID
                
                  return (
                    <tr key={tableID}>
                      
                      {/* NOM TABLE */}
                      <td className="border border-gray-300 p-1 sm:p-2 font-semibold bg-gray-50 sticky left-0 z-5 min-w-[80px] sm:min-w-[120px] lg:min-w-[150px]">
                        {tableName}
                      </td>
                  
                      {/* COLONNES PAR DATE */}
                      {dates.map(date => {
                        
                        //IMPORTANT : on récupère toutes les réservations du jour
                        const tablesForDate = tables.filter(
                          t => normalizeDateKey(t.day) === date
                        )
                      
                        return (
                          <td
                            key={date}
                            className="border border-gray-300 p-1 align-top min-h-[60px]"
                          >
                            {tablesForDate.length > 0 ? (
                              <div className="flex flex-col gap-1">
                                
                                {tablesForDate.map((res, i) => {
                                  const state = res.reservation_state
                                  const label = reservationStateLabels[state] || "Inconnu"
                                
                                  const cellColor =
                                    appliedFilters.mode === 0
                                      ? (state === 0
                                          ? 'bg-green-500'
                                          : 'bg-red-600')
                                      : tablestateStyles[state]
                                      
                                  return (
                                    <TooltipProvider key={`${date}-${i}`}>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div
                                            onClick={() => setSelectedTable(res)}
                                            className={`text-white text-[10px] px-1 py-[2px] rounded cursor-pointer hover:scale-102 transition-transform ${cellColor}`}
                                          >
                                            {res.actual_arrival
                                              ? timestampToText(res.actual_arrival)
                                              : "--"}{" "}
                                            -{" "}
                                            {res.actual_departure
                                              ? timestampToText(res.actual_departure)
                                              : "--"}
                                          </div>
                                        </TooltipTrigger>
                                            
                                        <TooltipContent>
                                          <p>
                                            Table : {tableName} <br />
                                            Date : {formatDateFR(date)} <br />
                                            État : {label} <br />
                                            Arrivée : {res.actual_arrival ? timestampToText(res.actual_arrival) : "Non défini"} <br />
                                            Départ : {res.actual_departure ? timestampToText(res.actual_departure) : "Non défini"}
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )
                                })}
          
                              </div>
                            ) : (
                              <div className="h-[20px]"></div>
                            )}
                          </td>
                        )
                      })}
          
                    </tr>
                  )
                })}
              </tbody>
              
            </table>
          </div>
        )}
    </div>
        {selectedTable && selectedMode === 1 && (
          <Dialog open={true} onOpenChange={() => setSelectedTable(null)}>
            <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden" aria-description="room-content">


              {/* HEADER */}
              <div className={`p-5 text-white flex justify-between items-start ${tablestateStyles[selectedTable.reservation_state]
                }`}>
                <div>
                  <h2 className="text-xl font-bold">
                    <DialogHeader>
                      <DialogTitle>{selectedTable.table_name}</DialogTitle>
                      <DialogDescription>
                        Détails de la disponibilité de la table
                      </DialogDescription>
                    </DialogHeader>
                  </h2>
                  <p className="text-sm opacity-90">
                    {reservationStateLabels[selectedTable.reservation_state]}
                  </p>
                </div>
              </div>

              {/* BODY */}
              <div className="p-6 space-y-6 bg-white">

                {/* ID */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Identifiant</span>
                  <span className="font-semibold text-gray-800">
                    {selectedTable.tableID}
                  </span>
                </div>

                {/* État badge */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">État</span>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full text-white ${tablestateStyles[selectedTable.reservation_state]
                      }`}
                  >
                    {reservationStateLabels[selectedTable.reservation_state]}
                  </span>
                </div>

                {/* PÉRIODE */}
                <div className="bg-gray-50 rounded-xl p-4 border space-y-3">

                  <h3 className="text-sm font-semibold text-gray-600">
                    Période du statut de la disponibilité:
                  </h3>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Début</span>
                    <span className="font-medium text-gray-800">
                      {((selectedTable.reservation_state !== 0 && selectedTable.reservation_state !== 5 && selectedTable.reservation_state !== 6 && selectedTable.reservation_state !== 8) && selectedMode === 1)
                        ? timestampToText(selectedTable.actual_arrival) : timestampToText(appliedFilters.start)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Fin</span>
                    <span className="font-medium text-gray-800">
                      {((selectedTable.reservation_state !== 0 && selectedTable.reservation_state !== 5 && selectedTable.reservation_state !== 6 && selectedTable.reservation_state !== 8) && selectedMode === 1)
                        ? timestampToText(selectedTable.actual_departure) : timestampToText(appliedFilters.end)}
                    </span>
                  </div>

                </div>

                {/* ACTION */}
                <div className="flex justify-end pt-2">
                  <Button
                    onClick={() => setSelectedTable(null)}
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
  )
}