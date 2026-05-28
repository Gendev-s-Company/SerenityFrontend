import DetailRoom from "@/features/hotel/room/detailRoom";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Détails de la chambre',
}

const page = () => {
  return (
    <div className="p-5">
      <DetailRoom />
    </div>
  )
}

export default page