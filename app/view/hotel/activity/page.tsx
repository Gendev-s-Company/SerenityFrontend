import Activity from '@/features/hotel/activity/Activity'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activités de l\'hôtel',
}


const page = () => {
  return (
    <div><Activity /></div>
  )
}

export default page