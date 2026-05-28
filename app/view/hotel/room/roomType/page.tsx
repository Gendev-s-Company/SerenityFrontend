import RoomType from '@/features/hotel/room/roomType/RoomType'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Types de chambres',
}

const page = () => {
  return (
   <div className="p-5">
    <RoomType/>
    </div>
  )
}

export default page