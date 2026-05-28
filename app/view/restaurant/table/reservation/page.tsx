import TableReservation from '@/features/restaurant/table/tablereservation/tableReservation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Etat des réservations de table',
}

const page = () => {
  return (
    <div><TableReservation /></div>
  )
}

export default page