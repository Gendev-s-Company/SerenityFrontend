import SeatingPlan from "@/features/restaurant/dish/seatingPlan/seatingPlan"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plan de table',
}


const page = () => {
  return (
    <SeatingPlan />
  )
}

export default page