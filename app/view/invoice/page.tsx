import InvoiceList from '@/features/invoice/invoice/list/InvoiceList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Facture',
}
const page = () => {
  return (
   <div className="p-5">
    <InvoiceList/>
    </div>
  )
}

export default page