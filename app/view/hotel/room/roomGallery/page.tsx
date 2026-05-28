import { RoomGallery } from "@/features/hotel/room/roomGallery/RoomGallery"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galerie des chambres',
}

const page = () => {
  return (
   <div className="p-5">
    <RoomGallery/>
    </div>
  )
}

export default page