import Customer from "@/features/hotel/customer/Customer"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clients',
}
const page = () => {
  return (
   <div className="p-5">
    <Customer/>
    </div>
  )
}

export default page