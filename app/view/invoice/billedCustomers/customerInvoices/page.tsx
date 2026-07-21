import BilledCustomers from '@/features/invoice/invoice/list/billedCustomers/BilledCustomers'
import CustomerInvoices from '@/features/invoice/invoice/list/billedCustomers/CustomerInvoices'
import InvoiceList from '@/features/invoice/invoice/list/InvoiceList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Factures du clients',
}
const page = () => {
  return (
   <div className="p-5">
    <CustomerInvoices/>
    </div>
  )
}

export default page