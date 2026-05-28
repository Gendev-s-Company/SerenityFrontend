import TableOrder from "@/features/restaurant/dish/dishOrder/forms/TableOrder"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creation d\'une commande',
}

const page = () => {
  return (
    <TableOrder />
  )
}

export default page