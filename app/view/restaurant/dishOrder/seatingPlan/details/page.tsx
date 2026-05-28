import SeatingPlanDetails from "@/features/restaurant/dish/seatingPlan/details/SeatingPlanDetails"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Détails du plan de table',
}


const page = () => {
  return (
    <SeatingPlanDetails />
  )
}

export default page