'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PhotoDetailRoom from './PhotoDetailRoom';
// import ActivityPrice from '../activityPrice/ActivityPrice';
import { getRoomyById } from '@/infrastructure/hotel/room/roomDetail/roomRequest';
import { RoomEntity } from '@/types/entity-type/roomEntity';

export default function DetailRoom() {
    // const roomID = useSearchParams().get('activityID');
    const roomID = 'ROOM000001';
    const [refresh, setRefresh] = useState<number>(0);

// ###############################################################################################################

    // const [lastPrice, setLastPrice] = useState<ActivityPriceEntity | null>(null);

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
    //     if (activityID) {
    //         getActivityLastPriceById(activityID).then((data) => {
    //             setLastPrice(data);
    //         })
    //             .catch((error) => {
    //                 console.error("Error fetching activity details:", error);
    //             });
    //     }
    // }, [activityID, refresh]);

// ###############################################################################################################


    return (
        <>
            <div className="w-full max-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">{room?.name}</h2>
                    <h1>En savoir plus? Voici quelques informations à propos de cet activité</h1>
                    <p>{room?.description}</p>
                    <p>{room?.type.name} : {room?.type.description}</p>
                    <p>Nombre de personne : {room?.peoples}</p>
                    <p>Nombre de lit : {room?.bed}</p>

                    {/* <p>Dernier prix : <span className="text-right font-medium"> {lastPrice ? `${getCurrency(lastPrice.price) } pour ${lastPrice.hourPrice}h` : 'N/A'} </span></p> */}
                </div>
            </div>
            <div className='p-3'><PhotoDetailRoom roomId={roomID || ""} /></div>
            <div className="w-full max-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
                <h2 className="text-xl font-semibold">Historique de prix</h2>
                {/* <ActivityPrice refresh={refresh} setRefresh={setRefresh} activityId={activityID || ""} /> */}
            </div>
        </>
    );
}