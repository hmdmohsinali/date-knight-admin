import React, { useState } from 'react'
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import DatePicker from '../Datepicker/Datepicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import './Eventsheet.css'

const data = [
  {
    ID: '24',
    CHALLENGER: 'John Doe',
    OPPONENT: 'CHAN BING',
    EVENTDATE: '',
    EVENTTime: 'Choose',
    APPROVE: <BsToggleOn />,
    EventAction: 'Schedule Event'
  },
  {
    ID: '21',
    CHALLENGER: 'John Doe',
    OPPONENT: 'CHAN BING',
    EVENTDATE: '',
    EVENTTime: 'Choose',
    APPROVE: <BsToggleOn />,
    EventAction: 'Schedule Event'
  },

];


const EventSheet = () => {

  const [toggleStates, setToggleStates] = useState(
    data.reduce((acc, _, index) => {
      acc[index] = true;
      return acc;
    }, {})
  );

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleClick = (index) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };



  return (
    <div className='py-4'>
      <div className='overflow-x-auto rounded-lg border-gray-500'>
        <table className='w-full  bg-white border-collapse'>
          <thead className='bg-[#FFA768] text-white rounded-lg h-10'>
            <tr >
              <th className='w-[18%]  px-3 uppercase font-semibold text-sm'>ID</th>
              <th className='w-[20%]  px-3 uppercase font-semibold text-sm'>CHALLENGER</th>
              <th className='w-[20%]  px-3 uppercase font-semibold text-sm'>OPPONENT</th>
              <th className='w-[16%]  px-2 uppercase font-semibold text-sm'>EVENT DATE  </th>
              <th className='w-[20%]  px-3 uppercase font-semibold text-sm whitespace-nowrap action'>EVENT TIME</th>
              <th className='w-[23%]  px-3 uppercase font-semibold text-sm whitespace-nowrap'>APPROVE</th>
              <th className='w-[25%]  px-3 uppercase font-semibold text-sm whitespace-nowrap'>EVENT ACTION</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {data.map((item, index) => (
              <tr key={index} className='rows'>
                <td className='w-[18%] py-2 px-4 '>{item.ID}</td>
                <td className='w-[20%] py-2 px-4 '>{item.CHALLENGER}</td>
                <td className='w-[20%] py-2 px-4 '>{item.OPPONENT}</td>
                <td className='w-[16%] py-2 px-14  '>

                </td>
                <td className='w-[20%] py-2 pl-16  '>{item.EVENTTime}  </td>
                <td className='w-[23%] py-2 pl-8  text-2xl ' onClick={() => handleClick(index)}>{toggleStates[index] ? (
                  <BsToggleOn className='text-brown transition-colors duration-300' />
                ) : (
                  <BsToggleOff className='text-gray-500 transition-colors duration-300' />)
                }
                </td>
                <td className='w-[25%]  eventaction relative '><button onClick={() => toggleDropdown(index)} className='btn m-1'>
                  {item.EventAction}
                </button>
                  {dropdownOpen === index && (
                    <ul className='menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow absolute top-[45%] right-[8%]  mt-1'>
                      <li><a href="#">Go live</a></li>
                      <li><a href="#">Schedule for later</a></li>
                    </ul>
                  )}
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
