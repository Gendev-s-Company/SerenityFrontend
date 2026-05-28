import Disponibilite from '@/features/hotel/room/disponibilite/disponibilite'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disponibilité des chambres',
}

const page = () => {
  return (
    <div><Disponibilite/></div>
  )
}

export default page