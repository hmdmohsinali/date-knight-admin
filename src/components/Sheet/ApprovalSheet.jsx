import React, { useState } from 'react';
import { FaCircleExclamation } from "react-icons/fa6";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { IoBan } from 'react-icons/io5';
import Picker from 'react-mobile-picker-scroll';
import './ApprovalSheet.css';

const data = [
  {
    name: 'Janice Han',
    email: 'janicehan@gmail.com',
    profile: 'View Profile',
    Contestant: false,
    Approve: true,
    Action: <IoBan />,
    banPeriod: '5 Months',
  },
  {
    name: 'Name 2',
    email: 'name@two.com',
    profile: 'View Profile',
    Contestant: false,
    Approve: true,
    Action: <IoBan />,
    banPeriod: '10 Years',
  },
  {
    name: 'Name 3',
    email: 'name@three.com',
    profile: 'View Profile',
    Contestant: false,
    Approve: true,
    Action: <IoBan />,
    banPeriod: '15 Years',
  },
];

const Table = ({ onProfileClick }) => {
  const [toggleStates, setToggleStates] = useState(
    data.map((item) => ({
      Contestant: item.Contestant || false,
      Approve: item.Approve || false,
      banPeriod: item.banPeriod,
    }))
  );

  const [showPicker, setShowPicker] = useState(null);
  const [selectedDate, setSelectedDate] = useState({ year: '10', month: '0', day: '5' });

  const handleToggleChange = (index, field) => {
    setToggleStates((prevState) => {
      const newState = [...prevState];
      newState[index][field] = !newState[index][field];
      return newState;
    });
  };

  const handleBanClick = (index) => {
    setShowPicker(index); 
  };

  const handleDateChange = (name, value) => {
    setSelectedDate((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  const handleSetDate = (index) => {
    const formattedDate = `${selectedDate.year} Years ${selectedDate.month} Months ${selectedDate.day} Days`;
    setToggleStates((prevState) => {
      const newState = [...prevState];
      newState[index].banPeriod = formattedDate;
      return newState;
    });
    setShowPicker(null); 
  };

  return (
    <div className='py-4 relative'>
      <div className='overflow-x-auto rounded-lg border-gray-500'>
        <table className='w-full bg-white border-collapse'>
          <thead className='bg-[#FFA768] text-white rounded-lg h-10'>
            <tr>
              <th className='px-3 uppercase font-semibold text-sm'>Name</th>
              <th className='px-3 uppercase font-semibold text-sm'>Email</th>
              <th className='px-3 uppercase font-semibold text-sm'>Contestant?</th>
              <th className='px-3 uppercase font-semibold text-sm'>Approve</th>
              <th className='px-3 uppercase font-semibold text-sm whitespace-nowrap action'>
                Action
                <div className='inline-block ml-2'>
                  <FaCircleExclamation />
                </div>
              </th>
              <th className='px-3 uppercase font-semibold text-sm whitespace-nowrap'>Ban Period</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {data.map((item, index) => (
              <tr key={index} className='rows'>
                <td className='py-2 px-4'>{item.name}</td>
                <td className='py-2 px-4'>{item.email}</td>
                <td className='py-2 px-4 text-2xl' onClick={() => handleToggleChange(index, 'Contestant')}>
                  {toggleStates[index].Contestant ? (
                    <BsToggleOn className='text-[#FFA768] transition-colors duration-300' />
                  ) : (
                    <BsToggleOff className='text-gray-500 transition-colors duration-300' />
                  )}
                </td>
                <td className='py-2 px-4 text-2xl' onClick={() => handleToggleChange(index, 'Approve')}>
                  {toggleStates[index].Approve ? (
                    <BsToggleOn className='text-[#FFA768] transition-colors duration-300' />
                  ) : (
                    <BsToggleOff className='text-gray-500 transition-colors duration-300' />
                  )}
                </td>
                <td className='py-2 px-4 relative' onClick={() => handleBanClick(index)}>
                  {item.Action}
                  {showPicker === index && (
                    <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-10 w-[180px]">
                      <div className="flex justify-between text-sm">
                        <span className="font-bold text-orange-500">Years</span>
                        <span className="font-bold text-orange-500">Months</span>
                        <span className="font-bold text-orange-500">Days</span>
                      </div>
                      <Picker
                        optionGroups={{
                          year: ['10', '15', '20'],
                          month: ['0', '5', '10', '15'],
                          day: ['1', '2', '3', '4', '5', '6', '7'],
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
                <td className='py-2 px-4'>{toggleStates[index].banPeriod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
