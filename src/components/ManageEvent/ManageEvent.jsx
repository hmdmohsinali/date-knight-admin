import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import EventSheet from '../Sheet/EventSheet';

const ManageEvent = () => {
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogout = () => {
    setShowLogout(prevShowLogout => !prevShowLogout);
  };

  const handleLogout = () => {

    console.log("Logged out");
  };
  return (
    <div className='px-8 py-4'>
      {/*Header  */}
      <div className='flex items-center h-10 justify-between py-6'>
        <h2 className='font-extrabold text-2xl text-[#FFA764]'>VisitorApproval</h2>
        <div className="relative">
          <FaRegUserCircle
            className='text-[#FFA764] text-xl cursor-pointer'
            onClick={toggleLogout}
          />
          {showLogout && (
            <button
              onClick={handleLogout}
              className="absolute right-0 mt-2 bg-[#FFA768] text-[white] p-2 rounded shadow-lg"
            >
              Logout
            </button>
          )}
        </div>
      </div>


      <EventSheet />

    </div>
  )
}

export default ManageEvent
