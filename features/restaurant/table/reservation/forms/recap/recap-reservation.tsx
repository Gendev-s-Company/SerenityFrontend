import { Card, CardHeader, CardAction, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { ReservationEntity } from '@/types/entity-type/reservationEntity'
import { RoomEntity } from '@/types/entity-type/roomEntity'
import { getCurrency } from '@/utils/Util'
import { Badge } from 'lucide-react'
import { init } from 'next/dist/compiled/webpack/webpack'
import React from 'react'

interface Recap {
    room: RoomEntity | null,
    init: ReservationEntity,
    client: string
}
const RecapResa = ({ room, init, client }: Recap) => {
    return (
        <Card className="relative mx-auto w-full min-w-md pt-0">
            <CardHeader>
                <CardAction>
                    <Badge fontVariant="secondary" className='p-2'>Featured</Badge>
                </CardAction>
                <CardTitle className='p-2'>
                    <h1 className='scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance'>
                        {/* {room?.name} */}
                        Récapitulation de la réservation
                    </h1>
                </CardTitle>
                <CardDescription>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 p-4 rounded-xl border border-slate-100 bg-indigo-50/30">
                            <span className="block text-xs font-semibold text-indigo-400 uppercase">Détail de la réservation: </span>
                            <span className="block font-bold text-slate-800">Client: {client}</span>
                            <span className="font-bold text-slate-800">Chambre: {room?.name}</span>
                            <p className="text-sm text-slate-500 mt-1">Description: {room?.description}</p>
                        </div>

                        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                            <span className="block text-xs font-semibold text-slate-400 uppercase">Capacité</span>
                            <span className="text-xl font-bold text-slate-700">{room?.peoples} Pers.</span>
                        </div>

                        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                            <span className="block text-xs font-semibold text-slate-400 uppercase">Couchage</span>
                            <span className="text-xl font-bold text-slate-700">{room?.bed} Lits</span>
                        </div>
                        <div className="col-span-2 p-4 rounded-xl border border-slate-100 bg-indigo-50/30">
                            <span className="block text-xs font-semibold text-indigo-400 uppercase">Duration: </span>
                            <span className="font-bold text-slate-800">du {new Date(init.starttime).toLocaleString()} au {new Date(init.endtime).toLocaleString()}</span>
                        </div>

                    </div>
                </CardDescription>
            </CardHeader>
            <CardFooter >
                <div className="flex flex-wrap gap-10 mt-4">
                    {room?.roomPrice?.nightPrice && (
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold border border-emerald-200">
                            🌙 {getCurrency(room.roomPrice.nightPrice)} / Nuit
                        </span>
                    )}

                    {room?.roomPrice?.hourPrice && (
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold border border-amber-200">
                            ⚡ {getCurrency(room.roomPrice.hourPrice)} / Heure
                        </span>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}

export default RecapResa