import React from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
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
            CHALLENGER: 'John Doe',
            OPPONENT: 'CHAN BING',
            EVENTTime: 'Choose',
            Eventstatus: 'completed',
            Eventwinner: 'no',
    
        },
    
    ];


    // const [info, setinfo] = useState(data);

    // const handleStatusChange = (index, newStatus) => {
    //     const newData = [...info];
    //     newData[index].Eventstatus = newStatus;
    //     setinfo(newData);
    // };


    return (
        <div className='py-4'>
            <div className='overflow-x-auto rounded-lg border-gray-500'>
                <table className='w-full  bg-white border-collapse'>
                    <thead className='bg-[#FFA768] text-white rounded-lg h-10'>
                        <tr >
                            <th className='w-[18%]  px-3 uppercase font-semibold text-sm'>ID</th>
                            <th className='w-[20%]  px-3 uppercase font-semibold text-sm'>CHALLENGER</th>
                            <th className='w-[20%]  px-3 uppercase font-semibold text-sm'>OPPONENT</th>
                            <th className='w-[20%]  px-3 uppercase font-semibold text-sm whitespace-nowrap'>EVENT TIME</th>
                            <th className='w-[20%]  px-3 uppercase font-semibold text-sm whitespace-nowrap'>EVEnt STATUS</th>
                            <th className='w-[20%]  px-3 uppercase font-semibold text-sm whitespace-nowrap'>WINNER</th>
                           
                        </tr>
                    </thead>
                    <tbody className='text-gray-700'>
                        {data.map((item, index) => (
                            <tr key={index} className='rows'>
                                <td className='w-[18%] py-2 px-4 '>{item.ID}</td>
                                <td className='w-[20%] py-2 px-4 '>{item.CHALLENGER}</td>
                                <td className='w-[20%] py-2 px-4 '>{item.OPPONENT}</td>
                                <td className='w-[20%] py-2 pl-16  '>{item.EVENTTime}  </td>
                                <td className='w-[23%] event-status pl-12'><button>{item.Eventstatus}
                                    <div className='drop-btn'>
                                        <RiArrowDropDownLine />
                                    </div>
                                </button>
                                <div className='dropdown-items'>
                                    <ul>
                                          <li className=''>Tied</li>
                                    </ul>
                                </div>
                                </td>
                                <td className='w-[25%] event-winner whitespace-nowrap '><button>{item.Eventwinner}
                                    <div className='drop-btn'>
                                        <RiArrowDropDownLine />
                                    </div>
                                </button>  
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
