import DetailTable from "@/features/restaurant/table/detailsTable/detailTable";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Détails de la table',
}

const page = () => {
  return (
    <div className="p-5">
      <DetailTable />
    </div>
  )
}

export default page