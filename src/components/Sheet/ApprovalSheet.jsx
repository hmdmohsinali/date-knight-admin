import React, { useState } from 'react';
import { FaCircleExclamation } from "react-icons/fa6";
import { BsTicketDetailed, BsToggleOn, BsToggleOff } from "react-icons/bs";
import { IoBan } from 'react-icons/io5';
import Picker from 'react-mobile-picker-scroll';

import './ApprovalSheet.css';

const data = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profile: 'view profile',
    Approve: <BsToggleOn />,
    Action: <IoBan />,
    banPeriod: '7 days',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    profile: <button>view profile</button>,
    Approve: <BsToggleOn />,
    Action: <IoBan />,
    banPeriod: '30 days',
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profile: 'view profile',
    Approve: <BsToggleOn />,
    Action: <IoBan />,
    banPeriod: '7 days',
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profile: 'view profile',
    Approve: <BsToggleOn />,
    Action: <IoBan />,
    banPeriod: '7 days',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    profile: <button>view profile</button>,
    Approve: <BsToggleOn />,
    Action: <IoBan />,
    banPeriod: '30 days',
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profile: 'view profile',
    Approve: <BsToggleOn />,
    Action: <IoBan />,
    banPeriod: '7 days',
  },
];

const Table = ({ onProfileClick, span }) => {

  const [toggleStates, setToggleStates] = useState(
    data.reduce((acc, _, index) => {
      acc[index] = true; // Initialize each toggle state to true
      return acc;
    }, {})
  );

  const [showPicker, setShowPicker] = useState(null); // State to control date picker visibility
  const [selectedDate, setSelectedDate] = useState({ year: '2023', month: '01', day: '01' });

  const handleClick = (index) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleBanClick = (index) => {
    setShowPicker(index); // Show date picker under the clicked icon
  };

  const handleDateChange = (name, value) => {
    setSelectedDate((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  const handleSetDate = (index) => {
    data[index].banPeriod = `${selectedDate.year} Years ${selectedDate.month} Months ${selectedDate.day} Days`;
    setShowPicker(null); // Hide date picker after setting the date
  };

  return (
    <div className='py-4 relative'>
      <div className='overflow-x-auto rounded-lg border-gray-500'>
        <table className='w-full  bg-white border-collapse'>
          <thead className='bg-[#FFA768] text-white rounded-lg h-10'>
            <tr>
              <th className='w-[20%]  px-3 uppercase font-semibold text-sm'>Name</th>
              <th className='w-[25%]  px-3 uppercase font-semibold text-sm'>Email</th>
              <th className='w-[20%]  px-3 uppercase font-semibold text-sm'>Profile</th>
              <th className='w-[16%]  px-2 uppercase font-semibold text-sm'>Approve</th>
              <th className='w-[20%]  px-3 uppercase font-semibold text-sm whitespace-nowrap action'>Action
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
                <td className='w-[20%] py-2 px-4'>
                  <button onClick={() => onProfileClick(item)}>{item.profile} </button>
                </td>

                <td className='w-[16%] py-2 px-14 text-2xl text-[#892525] ' onClick={() => handleClick(index)}>
                  {toggleStates[index] ? (
                    <BsToggleOn className='text-brown transition-colors duration-300' />
                  ) : (
                    <BsToggleOff className='text-gray-500 transition-colors duration-300' />
                  )}
                </td>
                <td className='w-[20%] py-2 pl-6 relative' onClick={() => handleBanClick(index)}>
                  {item.Action}
                  {showPicker === index && (
                    <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-10 w-64">
                      <div className="flex justify-between">
                        <span className="font-bold text-orange-500">Years</span>
                        <span className="font-bold text-orange-500">Months</span>
                        <span className="font-bold text-orange-500">Days</span>
                      </div>
                      <Picker
                        optionGroups={{
                          year: ['2023', '2024', '2025'],
                          month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                          day: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
                        }}
                        valueGroups={selectedDate}
                        onChange={handleDateChange}
                      />
                      <div className="flex justify-between mt-4">
                        <button className="text-orange-500" onClick={() => setShowPicker(null)}>Cancel</button>
                        <button className="text-orange-500" onClick={() => handleSetDate(index)}>Set</button>
                      </div>
                    </div>
                  )}
                </td>
                <td className='w-[23%] py-2 pl-16'>{item.banPeriod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
