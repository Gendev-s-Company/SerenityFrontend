import Disponibilite from "@/features/restaurant/table/disponibilite/disponibilite"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disponibilité des tables',
}


const page = () => {
  return (
    <div><Disponibilite /></div>
  )
}

export default page