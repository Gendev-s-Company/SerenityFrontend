import Plat from "@/features/restaurant/plat/plat/Plat"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plats du restaurant',
}

const page = () => {
  return (
    <Plat />
  )
}

export default page