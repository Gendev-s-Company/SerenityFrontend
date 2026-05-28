import TableType from "@/features/restaurant/table/tableType/TableType"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Types de tables',
}

const page = () => {
  return (
   <div className="p-5">
    <TableType />
    </div>
  )
}

export default page