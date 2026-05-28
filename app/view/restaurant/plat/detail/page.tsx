import DetailPlat from "@/features/restaurant/plat/detailsPlat/detailPlat";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Détails du plat',
}

const page = () => {
  return (
    <div className="p-5">
      <DetailPlat />
    </div>
  )
}

export default page