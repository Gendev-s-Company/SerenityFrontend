import DishOrderDetails from "@/features/restaurant/dish/dishOrderDetails/dishOrderDetails"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Détails de la commande',
}


const page = () => {
  return (
    <DishOrderDetails />
  )
}

export default page