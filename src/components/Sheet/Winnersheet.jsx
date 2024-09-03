import React from 'react'
// import { RiArrowDropDownLine } from "react-icons/ri";
import './WinneRsheet.css'
// import { useState } from 'react';



const EventSheet = () => {
    const data = [
        {
            ID: '24',
            CHALLENGER: 'John Doe',
            OPPONENT: 'CHAN BING',
            EVENTTime: 'Choose',
            Eventstatus: 'completed',
            Eventwinner: 'John deo',
    
    
        },
        {
            ID: '21',
            CHALLENGER: 'Smith',
            OPPONENT: 'CHAN BING',
            EVENTTime: 'Choose',
            Eventstatus: 'completed',
            Eventwinner: 'Smith',
    
        },

        {
            ID: '21',
            CHALLENGER: 'Smith',
            OPPONENT: 'CHAN BING',
            EVENTTime: 'Choose',
            Eventstatus: 'completed',
            Eventwinner: 'Smith',
    
        },

        {
            ID: '21',
            CHALLENGER: 'Smith',
            OPPONENT: 'CHAN BING',
            EVENTTime: 'Choose',
            Eventstatus: 'completed',
            Eventwinner: 'Smith',
    
        },

        {
            ID: '21',
            CHALLENGER: 'smith',
            OPPONENT: 'CHAN BING',
            EVENTTime: 'Choose',
            Eventstatus: 'completed',
            Eventwinner: 'smith',
    
        },

        
   
    
    ];


   


    return (
        <div className='py-4'>
            <div className='overflow-auto md:overflow-hidden rounded-lg border-gray-500'>
                <table className='w-full  bg-white border-collapse'>
                    <thead className='bg-[#FFA768] text-white rounded-lg h-10'>
                        <tr >
                            <th className='w-[18%]  px-3 uppercase font-semibold text-sm'>Id</th>
                            <th className='w-[20%]  px-3 uppercase font-semibold text-sm'>Challenger</th>
                            <th className='w-[20%]  px-3 uppercase font-semibold text-sm'>Opponent</th>
                            <th className='w-[20%]  px-3 uppercase font-semibold text-sm whitespace-nowrap'>Event Time</th>
                            <th className='w-[20%]  px-3 uppercase font-semibold text-sm whitespace-nowrap'>Event Status</th>
                            <th className='w-[20%]  px-3 uppercase font-semibold text-sm whitespace-nowrap'>Winner</th>
                           
                        </tr>
                    </thead>
                    <tbody className='text-gray-700'>
                        {data.map((item, index) => (
                            <tr key={index} className='rows'>
                                <td className='w-[18%] py-2 md:pl-12  pl-4'>{item.ID}</td>
                                <td className='w-[20%] py-2 px-8 '>{item.CHALLENGER}</td>
                                <td className='w-[20%] py-2 px-6 '>{item.OPPONENT}</td>
                                <td className='w-[20%] py-2 pl-16  '>{item.EVENTTime}  </td>
                                <td className='w-[23%] event-status pl-12'><div className="dropdown dropdown-hover">
                                        <div tabIndex={0} role="button" className="btn px-4  rounded-full w-[100%] text-[green] bg-[#b2f5b2]">
                                            {item.Eventstatus}
                                           
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-20 p-2 shadow">
                                            <li><a>Tied</a></li>
                                          
                                        </ul>
                                    </div>
                                </td>
                                <td className='w-[25%] event-winner whitespace-nowrap '><div className="dropdown dropdown-hover">
                                        <div tabIndex={0} role="button" className="btn m-1 ">
                                            {item.Eventwinner}
                                           
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-20 p-2 shadow">
                                            <li><a>Tied</a></li>
                                            
                                        </ul>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EventSheet
