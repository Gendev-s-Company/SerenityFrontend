
import Reservation from '@/features/restaurant/table/reservation/reservation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réservation de table',
}


const page = () => {
  return (
      <Reservation />
  )
}

export default page