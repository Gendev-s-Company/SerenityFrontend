import Pack from "@/features/pack/pack"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Packs',
}
const page = () => {
  return (
    <Pack />
  )
}

export default page