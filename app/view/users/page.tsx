import Users from '@/features/users/Users'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Utilisateurs',
}

const page = () => {
  return (
    <div><Users /></div>
  )
}

export default page