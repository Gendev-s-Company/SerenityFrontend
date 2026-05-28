import DishOrder from "@/features/restaurant/dish/dishOrder/dishOrder"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commandes des tables',
}

const page = () => {
  return (
    <DishOrder />
  )
}

export default page