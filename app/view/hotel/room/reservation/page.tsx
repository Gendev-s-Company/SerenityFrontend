import RoomReservation from "@/features/hotel/room/roomReservation/roomReservation";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réservation de chambre',
}


const page = () => {
  return (
    <div><RoomReservation /></div>
  )
}

export default page