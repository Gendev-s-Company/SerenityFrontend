import Profil from '@/features/users/profils/Profil'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profil utilisateur',
}

const page = () => {
  return (
    <div><Profil /></div>
  )
}

export default page