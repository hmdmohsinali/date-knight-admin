import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import EventSheet from '../Sheet/EventSheet';

const ManageEvent = () => {
  return (
    <div className='px-8 py-4'>
       {/*Header  */}
       <div className='flex items-center h-10 justify-between py-6 ' >
        <h2 className='font-extrabold text-2xl text-[#FFA764] '>Manage Event</h2>
        <FaRegUserCircle className='text-[#FFA764] text-xl' />
      </div>

      <EventSheet/>
      
    </div>
  )
}

export default ManageEvent
