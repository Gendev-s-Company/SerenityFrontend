import ActivitiesOrder from "@/features/hotel/activity/ActivityOrder";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réservation d\'activité',
}

const page = () => {
  return (
    <div><ActivitiesOrder /></div>
  )
}

export default page