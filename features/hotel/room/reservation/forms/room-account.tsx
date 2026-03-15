import React from 'react'
interface Form {
    handleForms: (name:string, value:string) => void;
}

const RoomAccount = ({handleForms}:Form) => {
  return (
    <div>RoomAccount</div>
  )
}

export default RoomAccount