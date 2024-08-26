import React, { useState } from 'react';
import { IoBan } from 'react-icons/io5';
import { FaInfoCircle } from 'react-icons/fa';
import ViewProfile from './ViewProfile'; // Import the ViewProfile component
import DatePicker from './DatePicker'; // Import the DatePicker component
import 'daisyui/dist/full.css';
import 'tailwindcss/tailwind.css';

const ManageCandidate = () => {
  const initialData = [
    {
      name: 'Janice Han',
      email: 'janicehan@gmail.com',
      profile: 'View Profile',
      contestant: false,
      approve: true,
      banPeriod: '5 Months',
    },
    {
      name: 'Name 2',
      email: 'name@two.com',
      profile: 'View Profile',
      contestant: false,
      approve: true,
      banPeriod: '10 Years',
    },
    {
      name: 'Name 3',
      email: 'name@three.com',
      profile: 'View Profile',
      contestant: false,
      approve: true,
      banPeriod: '15 Years',
    },
    {
      name: 'Janice Han',
      email: 'janicehan@gmail.com',
      profile: 'View Profile',
      contestant: false,
      approve: true,
      banPeriod: '5 Months',
    },
  ];

  const [toggleStates, setToggleStates] = useState(initialData);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activePickerIndex, setActivePickerIndex] = useState(null); // State to track which row's DatePicker is active

  const handleToggleChange = (index, field) => {
    setToggleStates((prevState) => {
      const newState = prevState.map((item, i) =>
        i === index ? { ...item, [field]: !item[field] } : item
      );
      return newState;
    });
  };

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setIsProfileOpen(true);
  };

  const handleDateSelect = (selectedDate, index) => {
    if(selectedDate){
    setToggleStates((prevState) => {
      const newState = prevState.map((item, i) =>
        i === index ? { ...item, banPeriod: selectedDate } : item
      );
      return newState;
    });}
    setActivePickerIndex(null); // Close DatePicker after selection
  };

  return (
    <div className="py-4 scrollable-container">
      <div className=" rounded-lg border-gray-300">
        <table className="w-full bg-white border-collapse text-center">
          <thead className="bg-[#FFA768] text-white rounded-lg h-12">
            <tr>
              <th className="px-3 uppercase font-semibold text-sm">Name</th>
              <th className="px-3 uppercase font-semibold text-sm">Email</th>
              <th className="px-3 uppercase font-semibold text-sm">Profile</th>
              <th className="px-3 uppercase font-semibold text-sm">Contestant?</th>
              <th className="px-3 uppercase font-semibold text-sm">Approve</th>
              <th className="px-3 uppercase font-semibold text-sm whitespace-nowrap">
                Action
                <div className="tooltip tooltip-bottom ml-2" data-tip="This will grant you the authority to ban individuals for a certain time frame">
                  <FaInfoCircle className="ml-2 inline-block text-white" />
                </div>
              </th>
              <th className="px-3 uppercase font-semibold text-sm">Ban Period</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {toggleStates.map((item, index) => (
              <tr key={index} className="rows">
                <td className="py-4 px-4">{item.name}</td>
                <td className="py-4 px-4">{item.email}</td>
                <td className="py-4 px-4">
                  <a
                    href="#"
                    className=""
                    onClick={() => handleViewProfile(item)}
                  >
                    {item.profile}
                  </a>
                </td>
                <td className="py-4 px-4">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-md checked:bg-orange-500" 
                    checked={item.contestant} 
                    onChange={() => handleToggleChange(index, 'contestant')} 
                  />
                </td>
                <td className="py-4 px-4">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-md  checked:bg-[#ff8956]" 
                    checked={item.approve} 
                    onChange={() => handleToggleChange(index, 'approve')} 
                  />
                </td>
                <td className="py-4 px-4">
                  <button
                    className="tooltip tooltip-bottom"
                    data-tip="Ban this candidate"
                    onClick={() => setActivePickerIndex(index)} // Show DatePicker for the clicked row
                  >
                    <IoBan className="text-xl" />
                  </button>
                  {activePickerIndex === index && (
                    <DatePicker 
                      onDateSelect={(selectedDate) => handleDateSelect(selectedDate, index)}
                    />
                  )}
                </td>
                <td className="py-4 px-4">{item.banPeriod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add ViewProfile component here */}
      <ViewProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        candidate={selectedCandidate}
      />
    </div>
  );
};

export default ManageCandidate;
