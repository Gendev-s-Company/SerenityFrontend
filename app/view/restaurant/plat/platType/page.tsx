import PlatType from "@/features/restaurant/plat/platType/PlatType"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Type de plats',
}


const page = () => {
  return (
   <div className="p-5">
    <PlatType/>
    </div>
  )
}

export default page