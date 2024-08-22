import React from 'react';
import { NavLink } from 'react-router-dom';
import logoipsum from '../../assets/logoipsum.png';
import { IoMenu } from "react-icons/io5";

const Sidebar = ({ isOpen, toggleSideBar }) => {
  return (
    <>
      <div onClick={toggleSideBar} className="text-3xl md:hidden absolute top-4 left-4 z-20 cursor-pointer text-white">
        <IoMenu />
      </div>
      <div className={`fixed inset-y-0 left-0 w-[250px] bg-gradient-to-br from-[#FFA764] to-[#FF7B50] p-6 shadow-xl transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0 md:transition-none`}>
        <div className='mb-10 flex justify-center items-center'>
          <img src={logoipsum} alt="Logo" className="h-12 w-auto"/>
        </div>
        <ul className='space-y-2'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `block py-3 px-4 text-lg font-medium rounded-lg transition-colors duration-300 ${isActive ? 'bg-white text-[#FFA764]' : 'text-white hover:bg-[#FF7B50] hover:bg-opacity-80'}`
              }
            >
              Visitor Approval
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/manage-event'
              className={({ isActive }) =>
                `block py-3 px-4 text-lg font-medium rounded-lg transition-colors duration-300 ${isActive ? 'bg-white text-[#FFA764]' : 'text-white hover:bg-[#FF7B50] hover:bg-opacity-80'}`
              }
            >
              Manage Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/manage-winner'
              className={({ isActive }) =>
                `block py-3 px-4 text-lg font-medium rounded-lg transition-colors duration-300 ${isActive ? 'bg-white text-[#FFA764]' : 'text-white hover:bg-[#FF7B50] hover:bg-opacity-80'}`
              }
            >
              Manage Winner
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
