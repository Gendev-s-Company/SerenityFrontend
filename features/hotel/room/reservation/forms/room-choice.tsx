import React from 'react'
interface Form {
    handleForms: (name:string, value:string) => void;
}

const RoomChoice = ({handleForms}:Form) => {
  return (
    <div>RoomChoice</div>
  )
}

export default RoomChoice