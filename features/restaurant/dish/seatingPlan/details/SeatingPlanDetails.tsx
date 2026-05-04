"use client";
import { create, getAllDisponibilityByTable } from "@/infrastructure/restaurant/table/tableOccupation/tableOccupationRequest";
import { PageType } from "@/types/component-type/PageType";
import { DishOrderEntity } from "@/types/entity-type/dishOrderEntity";
import { TableReservationEntity } from "@/types/entity-type/tableReservationEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { getEndOfDay, getStartOfDay, timestampToText } from "@/utils/Util";
import { PaginationState } from "@tanstack/react-table";
import { Clock, CookingPot, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Info,

} from "lucide-react";
import CreateBox from "@/components/create/create-box";
import { getAllCustomerByCompany } from "@/infrastructure/hotel/customer/customerRequest";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { convertListCustomersToOption } from "@/features/hotel/room/reservation/forms/customer-choice";
import { TableReservationFields } from "@/features/restaurant/table/tablereservation/prep-view-tableReservation";
import { getDishOrderByTableoccupation } from "@/infrastructure/restaurant/dish/dishOrder/dishOrderRequest";
import { stateLabel } from "../../dishOrderDetails/prep-view-dishOrderDetails";
import { useRouter } from "next/navigation";

const occupationStateLabels: Record<number, string> = {
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

const occupationstateStyles: Record<number, string> = {
  9: "bg-gray-100 text-gray-500",     // Aucune donnée
  0: "bg-green-100 text-green-500",     // Libre
  1: "bg-yellow-100 text-yellow-500",    // Réservation non validée
  2: "bg-blue-100 text-blue-500",      // Réservation validée 
  3: "bg-red-100 text-red-500",       // Occupée sans réservation 
  4: "bg-orange-100 text-orange-500",    // Occupée avec réservation 
  5: "bg-gray-100 text-gray-500",      // Fini avec réservation 
  6: "bg-gray-100 text-gray-500",      // Fini sans réservation  clair
  7: "bg-purple-100 text-purple-500",    // Payé mais absent 
  8: "bg-red-100 text-red-500",    // Payé mais absent
}

export default function SeatingPlanDetails() {
    const router = useRouter();
    const idtable = useSearchParams().get('tableID');
    const [tableOccupations, setTableOccupations] = useState<TableReservationEntity[]>([]);
    const [startInput, setStartInput] = useState(getStartOfDay());
    const [endInput, setEndInput] = useState(getEndOfDay());
    
    const [starttime, setStarttime] = useState(getStartOfDay());
    const [endtime, setEndtime] = useState(getEndOfDay());
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState<number>(0);
    const [page, setPage] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: pageSize,
    });
    const [all, setAll] = useState<PageType>({
      totalElement: 0,
      totalPage: 0,
    });
    const user = getLocalStorage()!;
    const [customers, setCustomers] = useState<FieldOptions[]>([]);

  const [selectedOccupation, setSelectedOccupation] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [occupationDetails, setOccupationDetails] = useState<DishOrderEntity | null>(null);

    // Liste des clients pour le choix du client lors de l'occupation d'une table
    useEffect(() => {
      if (user && user?.profil?.company?.companyID) {
        getAllCustomerByCompany(user.profil.company.companyID)
          .then((data) => {
            setCustomers(convertListCustomersToOption(data));
            console.log("Liste des clients:", data);
          })
          .catch((error) => console.log(error));
      }
    }, []);

    const customerOptions: FieldConfig<TableReservationEntity> = useMemo(
      () => ({
        name: "customerID",
        libelle: "Client :",
        type: "select",
        normal: false,
        items: customers,
        objectMapping: {
          idKey: "customerID",
          labelKey: "name",
        },
      }),
      [customers],
    );

    const namefield = useMemo(() => {
        return [customerOptions,  ...TableReservationFields];
    }, [customerOptions]);


    // Table Occupation d'une table
        useEffect(() => {
           // eslint-disable-next-line react-hooks/set-state-in-effect
           setLoading(true)
           if (user && user.profil.company.companyID) {
             getAllDisponibilityByTable(
               idtable!,
               starttime,
               endtime,
               page.pageIndex,
               page.pageSize,
             )
               .then((data) => {
                 setTableOccupations(data.content);
                 console.log(data.content);
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
              console.error("Error fetching table occupations:", error)
            });
        }
    }, [refresh, page.pageIndex, starttime, endtime, idtable]);

    const handleSearch = () => {
        setStarttime(startInput);
        setEndtime(endInput);
        setPage((prev) => ({ ...prev, pageIndex: 0 })); // reset pagination
    };

    const handleReset = () => {
        setStartInput(getStartOfDay());
        setEndInput(getEndOfDay());
    };

    const hasActiveState = tableOccupations.some(
        (item) => ![0, 5, 6, 8].includes(item.state)
    );

    const body: TableReservationEntity = {
        occupationID: null,
        tableID:idtable!,
        customerID: null,
        userID: user.userID!,
        starttime: new Date(starttime),
        endtime: new Date(endtime),
        state: 0,
        room: null!,
        user: null!,
        customer: null!,
        table: null!,
    };

    const onCreate = async (formData: TableReservationEntity) => {
      console.log("Avant transformation :", formData);
    
      const formattedData = {
        ...formData,
        customerID:
          typeof formData.customerID === "object" && formData.customerID !== null
            ? (formData.customerID as any).customerID
            : formData.customerID,
      };
    
      console.log("Après transformation :", formattedData);
    
      await create(formattedData);
      setRefresh((prev) => prev + 1);
    };

    const handleOpenModal = async (item: any) => {
        setSelectedOccupation(item);
        setOpenModal(true);
        setLoadingDetails(true);
    
        try {
            const data = await getDishOrderByTableoccupation(item.occupationID);
        
            if (!data) {
                // cas commande inexistante
                setOccupationDetails(null);
                return;
            }
          
            setOccupationDetails(data);
          
        } catch (error: any) {
        
          if (error?.response?.status === 404) {
                setOccupationDetails(null);
            } else {
                // optionnel : autre erreur
                setOccupationDetails(null);
            }
          
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleButtonClick = () => {
      router.push(`/view/restaurant/dishOrder/tableOrder`);
    };

    const order = (idOccupation: string) => {
      router.push(`/view/restaurant/dishOrder/tableOrder?idOccupation=`+ idOccupation);
    };

    return (     
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-gray-50 min-h-screen">
        {/* HEADER */}
      <div className="bg-blue-100 border border-blue-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
        <div className="bg-blue-500 p-3 rounded-xl text-white">
          <Clock size={22} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Restaurant</p>
          <h1 className="font-bold text-lg text-blue-700">Occupation de la table {idtable}</h1>
        </div>
      </div>
        <div className="flex gap-4 items-center bg-white p-4 rounded-xl shadow-sm">
                <div>
                    <label className="text-xs text-gray-500">Date début:</label>
                    <input
                        type="datetime-local"
                        value={startInput}
                        onChange={(e) => setStartInput(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="text-xs text-gray-500">Date fin:</label>
                    <input
                        type="datetime-local"
                        value={endInput}
                        onChange={(e) => setEndInput(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm"
                         >
                    Rechercher
                </button>
                <button
                    onClick={handleReset}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-sm"
                >
                    Réinitialiser
                </button>

        </div>
        {hasActiveState ? (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="p-3 text-left font-semibold">ID</th>
              <th className="p-3 text-left font-semibold">Date début</th>
              <th className="p-3 text-left font-semibold">Date fin</th>
              <th className="p-3 text-left font-semibold">Etat</th>
              <th className="p-3 text-center font-semibold">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y">

            {tableOccupations.map((item) => (
              <tr
                key={item.occupationID}
                className="hover:bg-gray-50 transition"
              >
              
                {/* ID */}
                <td className="p-3">
                  <span
                  onClick={() => handleOpenModal(item)}
                  className="text-blue-600 font-medium cursor-pointer hover:underline">
                    {item.occupationID}
                  </span>
                </td>
            
                {/* DATE DEBUT */}
                <td className="p-3 text-gray-600">
                  {timestampToText(item.starttime)}
                </td>
            
                {/* DATE FIN */}
                <td className="p-3 text-gray-600">
                  {timestampToText(item.endtime)}
                </td>
            
                {/* ETAT */}
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium
                    ${occupationstateStyles[item.state]}
                  `}>
                    {occupationStateLabels[item.state] || item.state}
                  </span>
                </td>
                    
                {/* ACTION */}
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg transition"
                    >
                      <Info size={16} />
                    </button>
                  </div>
                </td>
                    
              </tr>
            ))}

          </tbody>
          
        </table>
          {openModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            
              <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-5xl h-[90vh] flex flex-col overflow-hidden">
          
                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <div>
                    <h2 className="text-lg font-semibold">Détails de l'occupation</h2>
                    <p className="text-xs opacity-80">
                      Table {selectedOccupation?.tableID || ""}
                    </p>
                  </div>
          
                  <button
                    onClick={() => setOpenModal(false)}
                    className="bg-white/20 hover:bg-red-500 p-2 rounded-lg transition"
                  >
                    <X size={18} />
                  </button>
                </div>
          
                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          
                  {/* INFOS CARDS */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-xs text-gray-400">ID</p>
                      <p className="font-semibold text-gray-700">
                        {selectedOccupation?.occupationID}
                      </p>
                    </div>
          
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-xs text-gray-400">Début</p>
                      <p className="text-sm font-medium">
                        {timestampToText(selectedOccupation?.starttime)}
                      </p>
                    </div>
          
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-xs text-gray-400">Fin</p>
                      <p className="text-sm font-medium">
                        {timestampToText(selectedOccupation?.endtime)}
                      </p>
                    </div>
          
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-xs text-gray-400">Etat</p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                        {occupationStateLabels[selectedOccupation?.state]}
                      </span>
                    </div>
                  </div>
          
                  {/* COMMANDE */}
                  <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
          
                  {occupationDetails ? (
                  
                    <div className="flex justify-between items-center border-b pb-3">
                      
                      <div>
                        <p className="text-xs text-gray-400">Commande</p>
                        <p className="font-semibold text-gray-700">
                          {occupationDetails.orderID}
                        </p>
                      </div>
                  
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="text-sm font-medium">
                          {timestampToText(occupationDetails.dateOrder)}
                        </p>
                      </div>
                  
                    </div>
                  
                  ) : (
                  
                    <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed rounded-xl bg-gray-50">
                    
                      {/* Icône */}
                      <div className="bg-gray-200 p-3 rounded-full mb-3">
                        <Info size={20} className="text-gray-500" />
                      </div>
                  
                      {/* Texte */}
                      <p className="text-sm font-medium text-gray-600">
                        Aucune commande trouvée
                      </p>
                  
                      <p className="text-xs text-gray-400 mt-1">
                        Cette table n'a pas encore de commande associée
                      </p>
                  
                    </div>
                  
                  )}
          
                    {/* HEADER TABLE */}
                    <div className="grid grid-cols-4 text-xs text-gray-400 font-medium px-2">
                      <span>Plat</span>
                      <span className="text-center">Qté</span>
                      <span className="text-center">Prix</span>
                      <span className="text-right">Etat</span>
                    </div>
          
                    {/* LISTE SCROLLABLE */}
                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
          
                      {loadingDetails ? (
                        <p className="text-center text-sm text-gray-400 animate-pulse py-4">
                          Chargement...
                        </p>

                      ) : (occupationDetails?.details?.length ?? 0) > 0 ? (
                      
                        occupationDetails?.details.map((d) => (
                          <div
                            key={d.orderDetailsID}
                            className="grid grid-cols-4 items-center bg-gray-50 hover:bg-gray-100 border rounded-xl p-3 transition"
                          >
                            <span className="font-medium text-gray-700">
                              {d.dish?.name}
                            </span>
                        
                            <span className="text-center text-gray-600">
                              {d.quantity}
                            </span>
                        
                            <span className="text-center text-gray-600">
                              {d.unitPrice} Ar
                            </span>
                        
                            <span className="flex justify-end">
                              <span className={`px-2 py-1 text-xs rounded-full font-medium
                                ${stateLabel[d.state] === 'En cours' ? "bg-gray-200 text-gray-600" :
                                  stateLabel[d.state] === 'Terminé' ? "bg-green-100 text-green-600" :
                                  "bg-red-100 text-red-600"}
                              `}>
                                {stateLabel[d.state]}
                              </span>
                            </span>
                          </div>
                        ))
                      
                      ) : (
                        <div>
                          <p className="text-center text-sm text-gray-400 py-4">
                            Aucun détail disponible
                          </p>
                          {/* <div className="flex justify-center pb-4">
                            <button
                              onClick={handleButtonClick}
                              className="flex items-center gap-2 bg-blue-800 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                            >
                            <Menu size={16} />
                              Commander des plats
                            </button>
                          </div> */}
                        </div>
                      )}

                    </div>
                  </div>
                </div>
                    
                {/* FOOTER (TOTAL) */}
                  <div className="bg-white border-t px-6 py-4 flex justify-between items-center">

                    <div>
                      <p className="text-xs text-gray-400">Total commande</p>                 

                      {occupationDetails ? (
                        <p className="text-xl font-bold text-green-600">
                          {occupationDetails.totalPrice || 0} Ar
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400">
                          Aucun total disponible
                        </p>
                      )}
                    </div>                  

                  </div>
                    
              </div>
            </div>
          )}
    </div>
        ) : (    
        <div className="flex flex-col items-center h-64 bg-white rounded-2xl shadow-md p-4">

          {/* Texte */}
          <p className="text-center text-sm text-gray-400">
            Cette table n'est pas occupée pour aujourd'hui
          </p>

          {/* Zone centrale */}
          <div className="flex-1 flex items-center justify-center w-full">

            <div className="flex items-center gap-4">
              {/* CreateBox */}
              <CreateBox body={body} onSubmit={onCreate} fields={namefield} />

              {/* Bouton */}
              <button
                className="flex items-center gap-1 bg-blue-800 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                onClick={handleButtonClick}
              >
                <CookingPot size={16} />
                Voir et commander les plats
              </button>
            </div>

          </div>

        </div>
        )}
    </div>
    );
    
}