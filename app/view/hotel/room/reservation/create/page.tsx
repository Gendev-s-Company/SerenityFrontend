import Reservation from '@/features/hotel/room/reservation/reservation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réservation de chambre',
}


const page = () => {
  return (
      <Reservation />
  )
}

export default page