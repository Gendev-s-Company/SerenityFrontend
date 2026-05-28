import WorkSchedulePage from '@/features/users/work/WorkSchedule'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Planning de travail',
}

const page = () => {
  return (
    <div><WorkSchedulePage /></div>
  )
}

export default page