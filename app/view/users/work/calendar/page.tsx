import Planning from '@/features/users/work/planning/planning'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calendrier de travail',
}
const page = () => {
  return (
    <Planning />
  )
}

export default page