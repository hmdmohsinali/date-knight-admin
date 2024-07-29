import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import Winnersheet from '../Sheet/Winnersheet';

const ManageWinner = () => {
    return (
        <div className='px-8 py-4'>

            {/*Header  */}
            <div className='flex items-center h-10 justify-between py-6 ' >
                <h2 className='font-extrabold text-2xl text-[#FFA764] '>VisitorApproval</h2>
                <FaRegUserCircle className='text-[#FFA764] text-xl' />
            </div>
            {/*DashBoard heading */}
           <h3 className='text-2xl text-[#FFA764] font-normal '>Dashboard</h3>
           <Winnersheet/>
        </div>
    )
}

export default ManageWinner
