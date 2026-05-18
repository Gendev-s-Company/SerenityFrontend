'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PhotoDetailTable from './PhotoDetailTable';


import { Button } from '@/components/ui/button';
import { getTableById } from '@/infrastructure/restaurant/table/tabledetail/tableRequest';
import { RestaurantTableEntity } from '@/types/entity-type/restauranTableEntity';
import { X,TriangleAlert, Check, Info, Search, RotateCcw } from 'lucide-react';
import { getEndOfDay, getStartOfDay, timestampToText } from '@/utils/Util';
import { getAllDisponibilityByTable } from '@/infrastructure/restaurant/table/tableOccupation/tableOccupationRequest';
import { PaginationState } from '@tanstack/react-table';
import { pageSize } from '@/utils/PaginationUtility';
import { TableReservationEntity } from '@/types/entity-type/tableReservationEntity';
import { PageType } from '@/types/component-type/PageType';

import { ReservationTableEntity } from '@/types/entity-type/reservationTableEntity';
import { getLocalStorage } from '@/utils/storage';
import { createReservation } from '@/infrastructure/restaurant/table/tablereservation/tableReservationRequest';
import { getAllCustomer } from '@/infrastructure/hotel/customer/customerRequest';
import { CustomerEntity } from '@/types/entity-type/customerEntity';

export default function Detailtable() {
    const tableID = useSearchParams().get('tableID');
    // const [refresh, setRefresh] = useState<number>(0);
    // const router = useRouter();
    // const navigate = () => router.push('/view/restaurant/table/createResa');
// ###############################################################################################################

    const [page, setPage] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: pageSize,
    });
    const [all, setAll] = useState<PageType>({
      totalElement: 0,
      totalPage: 0,
    });

    const [table, settable] = useState<RestaurantTableEntity | null>(null);
    const [openModal, setOpenModal]=    useState(false);
    const user = getLocalStorage()!;

    const [startDate, setStartDate] = useState(getStartOfDay());
    const [endDate,setEndDate]=useState(getEndOfDay());

    const [disponibility, setDisponibility]= useState<TableReservationEntity[]>([]);
    const [customers,setCustomers]= useState<CustomerEntity[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<string>("");

    const handleOpenModal = async () => {
      setOpenModal(true);
    }
    
    const [searched, setSearched] = useState(false);
    const handleSearch = async (item: RestaurantTableEntity | null) => {
         getAllDisponibilityByTable(
            item?.tableID ?? "", 
            startDate,
            endDate,
            page.pageIndex,
            pageSize
         )
        .then((data) => {
            setDisponibility(data.content);
             console.log('Disponibilite',data.content);
                setPage((prevPage) => ({
              ...prevPage,
              pageIndex: data.pageable.pageNumber,
            }));
            setAll({
              totalElement: data.totalElements,
              totalPage: data.totalPages,
            });
        })
    };

    const filteredOccupations = disponibility.filter(
      (item) => ![0, 5, 6, 8].includes(item.state)
    );

    const [validationError, setValidationError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const isOverlapping = (startA: string, endA: string, startB: Date, endB: Date) => {
        return new Date(startA) < new Date(endB) && new Date(endA) > new Date(startB);
    };
    
    const body: ReservationTableEntity = {
      tableID: tableID ??'',
      starttime: startDate,
      endtime: endDate,
      customerID: selectedCustomer,
      userID: user?.userID?? "",
      state: '1',
      status: 0,
      skipValidation: true,
    };

    const handleValidate = async () => {
      setValidationError('');
      setSuccessMessage('');
      const conflict = filteredOccupations.find((item) =>
        isOverlapping(startDate, endDate, item.starttime, item.endtime)
      );
      
      if (conflict) {
        setValidationError(
          `Conflit avec une réservation existante : ${conflict.customer.name} (${timestampToText(conflict.starttime)} à ${timestampToText(conflict.endtime)})`
        );
        return;
      }

      try {
        await createReservation(body); 
        setSuccessMessage("Réservation validée avec succès !");

      } catch ( error: any ){
        setValidationError('Une erreur s`est produite!');
        console.log(error);
      }
          
    }
    const handlereset = () =>{
        setStartDate(getStartOfDay());
        setEndDate(getEndOfDay());
        setDisponibility([]);
        setSearched(false);
    }

    useEffect(() => {
      if (user.profil.company.companyID) {
          getAllCustomer(user.profil.company.companyID).then((data) => {
              setCustomers(data);
          })
              .catch((error) => {
                  console.error("Error fetching customers", error);
              });
      }
    }, []);

    useEffect(() => {
        if (tableID) {
            getTableById(tableID).then((data) => {
                settable(data);
            })
                .catch((error) => {
                    console.error("Error fetching table details:", error);
                });
        }
    }, [tableID]);


// ###############################################################################################################


  return (
    <>
        <div className="w-full max-w-4xl mx-auto p-6 relative border border-slate-200 rounded-2xl bg-white shadow-sm">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-slate-100 pb-6 gap-4">
                <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{table?.name}</h2>
                <p className="text-slate-500 mt-1 text-lg">
                    Informations détaillées sur cette table
                </p>
                </div>
                
                {/* BOUTON RÉSERVER - Version Desktop */}
                <Button 
                size="lg"
                onClick={() => handleOpenModal()}
                 className="cursor-pointer hidden md:flex bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
                Réserver
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Description */}
                <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600">Description</h3>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {table?.description || "Aucune description disponible pour le moment."}
                </p>
                </div>

                {/* Right Side: Details & Stats */}
                <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600">{"Détails de la table"}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 p-4 rounded-xl border border-slate-100 bg-indigo-50/30">
                    <span className="block text-xs font-semibold text-indigo-400 uppercase">Catégorie</span>
                    <span className="font-bold text-slate-800">{table?.tabletype.name}</span>
                    <p className="text-sm text-slate-500 mt-1">{table?.tabletype.description}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <span className="block text-xs font-semibold text-slate-400 uppercase">Capacité</span>
                    <span className="text-xl font-bold text-slate-700">{table?.capacity} Pers.</span>
                    </div>

                </div>
                </div>
            </div>

                {/* BOUTON RÉSERVER - Version Mobile (visible seulement sur petit écran) */}
                <div className="mt-8 md:hidden">
                    <Button 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-100 transition-transform active:scale-[0.98]"
                        onClick={() => handleOpenModal()}
                    >
                        Réserver
                    </Button>
                </div>
            </div>


        {/* MODAL */}
        <div
          onClick={() => setOpenModal(false)}
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300
            ${openModal ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-white rounded-2xl overflow-hidden shadow-2xl w-[98%] max-w-5xl h-[90vh] flex flex-col transition-opacity duration-300
              ${openModal ? "opacity-100" : "opacity-0"}
            `}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
              <div>
                <h2 className="text-xl font-semibold">Réserver cette table</h2>
                <p className="text-sm text-blue-100">
                  Vérifiez la disponibilité avant validation
                </p>
              </div>
            
              <button
                title="Fermer la boite de dialogue"
                onClick={() => setOpenModal(false)}
                className="hover:bg-red-500 p-2 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* BODY */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            
              {/* DATE SECTION */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
                {/* Date début */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Date début
                  </label>
                  <input
                    name="datedebut"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder='Date de depart'
                  />
                </div>
            
                {/* Date fin */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Date fin
                  </label>
                  <input
                    name="datefin"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder='Date de fin'
                  />
                </div>
            
                {/* Table */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Table
                  </label>
                  <input
                    name="table"
                    type="text"
                    disabled
                    value={table?.name ?? ""}
                    className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                    placeholder='Numero de table'
                  />
                </div>

                {/* BOUTONS */}
                <div className="grid grid-cols-2 gap-2 items-end">
                            
                  {/* SEARCH */}
                  <button
                    title="Voir les disponibilités"
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-2 py-4 rounded-xl font-medium transition"
                    onClick={() => {
                      handleSearch(table);
                      setSearched(true);
                    }}
                  >
                    <Search size={18} />
                  </button>
                  
                  {/* RESET */}
                  <button
                    title="Réinitialiser"
                    className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white px-2 py-4 rounded-xl font-medium transition"
                    onClick={handlereset}
                  >
                    <RotateCcw size={18} />
                  </button>
                  
                </div>
              </div>
            
              {/* MESSAGE DYNAMIQUE */}
              <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">        
                {!searched ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed rounded-xl bg-gray-50">
                        <div className="bg-gray-200 p-3 rounded-full mb-3">
                          <Info size={20} className="text-gray-500" />
                        </div>
                    
                        <p className="text-sm font-medium text-gray-600">
                          Veuillez vérifier la disponibilité du créneau.
                        </p>
                    </div>
                ) : filteredOccupations.length > 0 ? (
                  <>
                  {/* LISTE DES OCCUPATIONS */}
                    <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 p-3 rounded-xl">
                      <TriangleAlert />
                      <span>Choisissez un créneau qui ne chevauche pas les réservations existantes.</span>
                    </div>
                    <div className="flex flex-col gap-3">               
                        <h3 className="font-semibold text-gray-700">
                          Réservations existantes
                        </h3>
                
                        {filteredOccupations.map((item, index) => (
                          <div
                            key={index}
                            className="p-3 border rounded-xl bg-gray-50"
                          >
                            <p className="text-sm font-medium">
                              Client : {item.customer?.name || "Inconnu"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Du <strong>{timestampToText(item.starttime)}</strong>{" "}
                              au <strong>{timestampToText(item.endtime)}</strong>
                            </p>
                          </div>
                        ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-xl">
                    <Check size={18} />
                    <span>Cette table est libre pour le créneau sélectionné.</span>
                  </div>
                )}
              </div> 
            
              {/* FORM */}
              <div className="flex flex-col gap-5">
          
                {/* SELECT */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Choisir le client
                  </label>
          
                  <select
                  title="customer"
                  name="customer"
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled>Sélectionner un client</option>
                      {customers.map((customer) => (
                          <option key={customer.customerID} value={customer.customerID ?? ""}>
                            {customer.name}
                          </option>
                        ))}
                  </select>
                </div>
          
                {/* VALIDATION ERROR / SUCCESS */}
                {validationError && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-xl">
                    {validationError}
                  </div>
                )}

                {successMessage && (
                  <div className="p-3 bg-green-50 text-green-700 rounded-xl">
                    {successMessage}
                  </div>
                )}

              {/* FOOTER */}
                {/* BUTTON */}
              <div className="border-t px-6 py-4 bg-white flex justify-end shrink-0">
                <button
                  onClick={handleValidate}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  Réserver
                </button>
              </div>
            
              </div>
            </div>
          </div>
        </div>
        
        <div className='p-3'><PhotoDetailTable tableId={tableID || ""} /></div>
    </>
);
}