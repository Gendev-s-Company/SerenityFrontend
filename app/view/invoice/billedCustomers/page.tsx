import BilledCustomers from '@/features/invoice/invoice/list/billedCustomers/BilledCustomers'
import InvoiceList from '@/features/invoice/invoice/list/InvoiceList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clients Facturés',
}
const page = () => {
  return (
   <div className="p-5">
    <BilledCustomers/>
    </div>
  )
}

export default page