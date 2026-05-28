import Company from '@/features/users/company/Company'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sociétés',  
}

const page = () => {
  return (
    <div><Company /></div>
  )
}

export default page