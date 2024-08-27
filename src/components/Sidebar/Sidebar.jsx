import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logoipsum from '../../assets/logoipsum.svg';
import { IoMenu, IoClose } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';

const Sidebar = ({ isOpen, toggleSideBar }) => {
  const navigate = useNavigate();

  // Handle logout functionality

  const handleLogout = async () => {
    try {

      localStorage.removeItem('token');
      navigate('/sign-in');
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error)
      
    }
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      <button 
        onClick={toggleSideBar} 
        className="text-3xl md:hidden absolute top-4 left-4 z-30 cursor-pointer text-black focus:outline-none" 
        aria-label="Toggle sidebar"
      >
        {isOpen ? <IoClose /> : <IoMenu />}
      </button>

      {/* Sidebar container */}
      <div 
        className={`fixed inset-y-0 left-0 w-[250px] bg-gradient-to-br from-[#FFA764] to-[#FF7B50] p-6 shadow-xl transition-transform transform z-20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:inset-0 md:transition-none`}
      >
        {/* Logo */}
        <div className='mb-6 mt-10 flex justify-center items-center'>
          <img src={logoipsum} alt="Logo" className=""/>
        </div>

        {/* Navigation Links */}
        <ul className='space-y-2'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `block py-3 px-4 text-lg font-medium rounded-lg transition-colors duration-300 ${
                  isActive ? 'bg-white text-[#FFA764]' : 'text-white hover:bg-[#FFA764]'
                }`
              }
            >
              Visitor Approval
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/invite-candidate'
              className={({ isActive }) =>
                `block py-3 px-4 text-lg font-medium rounded-lg transition-colors duration-300 ${
                  isActive ? 'bg-white text-[#FFA764]' : 'text-white hover:bg-[#FFA764]'
                }`
              }
            >
              Invite Candidate
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/manage-event'
              className={({ isActive }) =>
                `block py-3 px-4 text-lg font-medium rounded-lg transition-colors duration-300 ${
                  isActive ? 'bg-white text-[#FFA764]' : 'text-white hover:bg-[#FFA764]'
                }`
              }
            >
              Manage Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/manage-winner'
              className={({ isActive }) =>
                `block py-3 px-4 text-lg font-medium rounded-lg transition-colors duration-300 ${
                  isActive ? 'bg-white text-[#FFA764]' : 'text-white hover:bg-[#FFA764]'
                }`
              }
            >
              Manage Winner
            </NavLink>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="mt-10">
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 text-lg font-medium text-white bg-red-500 rounded-lg transition-colors duration-300 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          onClick={toggleSideBar} 
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
