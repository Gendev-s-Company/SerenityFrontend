import DetailActivity from "@/features/hotel/activity/detailActivity/detailActivity";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Détails de l\'activité',
}

const page = () => {
  return (
    <div className="p-5">
      <DetailActivity />
    </div>
  )
}

export default page