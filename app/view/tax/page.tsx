import Tax from "@/features/tax/tax"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Taxes',  
}

const page = () => {
  return (
    <div><Tax/></div>
  )
}
export default page