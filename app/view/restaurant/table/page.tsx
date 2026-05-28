import RestaurantTable from "@/features/restaurant/table/restauranttable/restaurantTable"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tables',
}

const page = () => {
  return (
    <RestaurantTable />
  )
}

export default page