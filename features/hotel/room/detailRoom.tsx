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
        <div className="w-full max-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">{room?.name}</h2>
                <h1 className="text-lg font-medium">En savoir plus ? Voici quelques informations &agrave; propos de cette activit&eacute;</h1>
                
                <div className="mt-4 space-y-2">
                    <p>{room?.description}</p>
                    <p><span className="font-semibold">{room?.type.name} :</span> {room?.type.description}</p>
                    <p>Nombre de personnes : {room?.peoples}</p>
                    <p>Nombre de lits : {room?.bed}</p>
                </div>
            </div>
        </div>
        <div className="w-full max-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
            <h2 className="text-xl font-semibold">Historique des prix</h2>
            <RoomPrice refresh={refresh} setRefresh={setRefresh} roomId={roomID || ""} />
        </div>
    </>
);
}