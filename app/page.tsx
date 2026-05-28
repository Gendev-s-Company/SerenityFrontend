import AuthenticationPage from '@/features/authentication/authentication-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Connexion - Serenity Application',  
}

const page = () => {
  return (
    <>
      <AuthenticationPage />
    </>
  )
}

export default page