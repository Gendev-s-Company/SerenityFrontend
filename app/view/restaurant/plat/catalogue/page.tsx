import Catalogue from "@/features/restaurant/plat/platCatalogue/platCatalogue";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu du restaurant',
}

const page = () => {
  return (
    <div className="p-5">
      <Catalogue />
    </div>
  )
}

export default page