import React,{useState} from 'react';
import { IoBan } from "react-icons/io5";
import { FaCircleExclamation } from "react-icons/fa6";
import { BsTicketDetailed, BsToggleOn } from "react-icons/bs";
import './ApprovalSheet.css';

const data = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profile:'view profile',
    Approve: <BsToggleOn />,
    Action:<IoBan />,
    banPeriod: '7 days',
    details:
      {
        location:'la',
        lastname:'no',

      }
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    profile:<button>veiw profile</button>,
    Approve: <BsToggleOn />,
    Action:<IoBan />,
    banPeriod: '30 days',
    details:
      {
        location:'USA,Washington',
        lastname:'smith',
        
      },
  },
  // Add more objects as needed
];

const Table = ({ onProfileClick,span}) => {

 
  return (
    <div className='py-4'>
      <div className='overflow-x-auto rounded-lg border-gray-500'>
        <table className='w-full  bg-white border-collapse'>
          <thead className='bg-[#FFA768] text-white rounded-lg h-10'>
            <tr >
              <th className='w-[20%]  px-3 uppercase font-semibold text-sm'>Name</th>
              <th className='w-[25%]  px-3 uppercase font-semibold text-sm'>Email</th>
              <th className='w-[20%]  px-3 uppercase font-semibold text-sm'>Profile</th>
              <th className='w-[16%]  px-2 uppercase font-semibold text-sm'>Approve </th>
              <th className='w-[23%]  px-3 uppercase font-semibold text-sm whitespace-nowrap action'>Action
                <div className='inline-block ml-2'>
                <FaCircleExclamation />
                  </div>
                  {span}
                  </th>
              <th className='w-[23%]  px-3 uppercase font-semibold text-sm whitespace-nowrap'>Ban Period</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {data.map((item, index) => (
              <tr key={index} className='rows'>
                <td className='w-[20%] py-2 px-4'>{item.name}</td>
                <td className='w-[25%] py-2 px-4'>{item.email}</td>
                <td className='w-[20%] py-2 px-4'><button onClick={()=>onProfileClick(item)}>{item.profile} </button></td>
                <td className='w-[16%] py-2 px-14 text-2xl text-[#892525]'>{item.Approve}  </td>
                <td className='w-[23%] py-2 pl-16 '>{item.Action}  </td>
                <td className='w-[23%] py-2 pl-16 '>{item.banPeriod}</td>
              </tr>   
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
