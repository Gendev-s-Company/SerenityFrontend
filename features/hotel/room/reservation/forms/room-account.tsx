import { ReservationEntity } from '@/types/entity-type/reservationEntity';
import React from 'react'
interface Form {
      init: ReservationEntity,
    handleForms: (name:string, value:string) => void;
}

const RoomAccount = ({handleForms, init}:Form) => {
  console.log(init);
  
  return (
    <div>RoomAccount</div>
  )
}

export default RoomAccount