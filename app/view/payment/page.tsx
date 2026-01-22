import { DataTableDemo } from "../../../components/liste/complexe-data-table"



export default async function DemoPage() {
  return (
    <div className="container mx-auto py-10 px-3">
      {/* <DataTable columns={columns} data={data} /> */}
      <DataTableDemo />
    </div>
  )
}