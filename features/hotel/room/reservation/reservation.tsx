import React from 'react'
import CustomerChoice from './forms/customer-choice'

const Reservation = () => {
  return (
    <div className="container mx-auto py-10 px-3">
      <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
        <CustomerChoice />
      </div>
    </div>
  )
}

export default Reservation