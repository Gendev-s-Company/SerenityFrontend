'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PhotoDetailRoom from './PhotoDetailRoom';
// import ActivityPrice from '../activityPrice/ActivityPrice';
import { getRoomyById } from '@/infrastructure/hotel/room/roomDetail/roomRequest';
import { RoomEntity } from '@/types/entity-type/roomEntity';
import { RoomPriceEntity } from '@/types/entity-type/roomPriceEntity';
import { getRoomLastPriceById } from '@/infrastructure/hotel/room/roomPrice/roomPriceRequest';
import RoomPrice from './roomPrice/roomPrice';
import { Button } from '@/components/ui/button';

export default function DetailRoom() {
    // const roomID = useSearchParams().get('activityID');
    const roomID = 'ROOM000001';
    const [refresh, setRefresh] = useState<number>(0);

// ###############################################################################################################

    const [lastPrice, setLastPrice] = useState<RoomPriceEntity | null>(null);

    const [room, setRoom] = useState<RoomEntity | null>(null);
    getRoomyById
    

    useEffect(() => {
        if (roomID) {
            getRoomyById(roomID).then((data) => {
                setRoom(data);
            })
                .catch((error) => {
                    console.error("Error fetching room details:", error);
                });
        }
    }, [roomID]);


    // useEffect(() => {
    //     if (roomID) {
    //         getRoomLastPriceById(roomID).then((data) => {
    //             setLastPrice(data);
    //         })
    //             .catch((error) => {
    //                 console.error("Error fetching activity details:", error);
    //             });
    //     }
    // }, [roomID, refresh]);

// ###############################################################################################################


  return (
    <>
        <div className="w-full max-w-4xl mx-auto p-6 relative border border-slate-200 rounded-2xl bg-white shadow-sm">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-slate-100 pb-6 gap-4">
                <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{room?.name}</h2>
                <p className="text-slate-500 mt-1 text-lg">
                    Informations détaillées sur cette activité
                </p>
                </div>
                
                {/* BOUTON RÉSERVER - Version Desktop */}
                <Button size="lg" className="hidden md:flex bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
                Réserver
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Description */}
                <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600">Description</h3>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {room?.description || "Aucune description disponible pour le moment."}
                </p>
                </div>

                {/* Right Side: Details & Stats */}
                <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600">Détails de l'hébergement</h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 p-4 rounded-xl border border-slate-100 bg-indigo-50/30">
                    <span className="block text-xs font-semibold text-indigo-400 uppercase">Catégorie</span>
                    <span className="font-bold text-slate-800">{room?.type.name}</span>
                    <p className="text-sm text-slate-500 mt-1">{room?.type.description}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <span className="block text-xs font-semibold text-slate-400 uppercase">Capacité</span>
                    <span className="text-xl font-bold text-slate-700">{room?.peoples} Pers.</span>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <span className="block text-xs font-semibold text-slate-400 uppercase">Couchage</span>
                    <span className="text-xl font-bold text-slate-700">{room?.bed} Lits</span>
                    </div>
                </div>

                {/* SECTION PRIX */}
                <div className="flex flex-wrap gap-3 mt-4">
                    {room?.roomPrice?.nightPrice && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold border border-emerald-200">
                        🌙 {room.roomPrice.nightPrice.toLocaleString()} Ar / Nuit
                    </span>
                    )}
                    
                    {room?.roomPrice?.hourPrice && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold border border-amber-200">
                        ⚡ {room.roomPrice.hourPrice.toLocaleString()} Ar / Heure
                    </span>
                    )}
                </div>
                </div>
            </div>

            {/* BOUTON RÉSERVER - Version Mobile (visible seulement sur petit écran) */}
            <div className="mt-8 md:hidden">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-100 transition-transform active:scale-[0.98]">
                Réserver
                </Button>
            </div>
            </div>
        
        <div className='p-3'><PhotoDetailRoom roomId={roomID || ""} /></div>
        
        <div className="w-full max-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
            <h2 className="text-xl font-semibold">Historique des prix</h2>
            <RoomPrice refresh={refresh} setRefresh={setRefresh} roomId={roomID || ""} />
        </div>
    </>
);
}