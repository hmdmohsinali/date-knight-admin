import React from 'react';
import { NavLink } from 'react-router-dom';
import logoipsum from '../../assets/logoipsum.png';
import { IoMenu } from "react-icons/io5";

const Sidebar = ({ isOpen, toggleSideBar }) => {
  return (
    <>

      <div onClick={toggleSideBar} className={`text-2xl md:hidden absolute top-1 left-2 z-10 `}>
        <IoMenu />
      </div>
      <div className={`w-[230px] bg-[#FFA764] p-2 md:p-4 h-screen transition duration-3000 ease-in-out  ${isOpen ? 'translate-x-0' : 'hidden'} md:block `}>
        <div className='mb-8 flex justify-center'>
          <img src={logoipsum} alt="Logo" />
        </div>
        <div className='w-[100%]'>
          <ul className='space-y-4 w-[100%]'>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? 'text-[#FFA768] font-light text-sm md:font-normal md:text-xl whitespace-nowrap bg-gray-50 p-2 w-[100%] rounded-md' : 'text-black'
                }
              >
                Visitor Approval
              </NavLink>
            </li>
            <li>
              <NavLink
                to='candidate-approval'
                className={({ isActive }) =>
                  isActive ? 'text-[#FFA768] font-light text-sm md:font-normal md:text-xl whitespace-nowrap bg-gray-50 p-2 w-[100%] rounded-md ' : 'text-black'
                }
              >
                Candidate Approval
              </NavLink>
            </li>
            <li>
              <NavLink
                to='manage-event'
                className={({ isActive }) =>
                  isActive ? 'text-[#FFA768] font-light text-sm md:font-normal md:text-xl whitespace-nowrap bg-gray-50 p-2 w-[100%] rounded-md' : 'text-black'
                }
              >
                Manage Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to='manage-winner'
                className={({ isActive }) =>
                  isActive ? 'text-[#FFA768] font-light text-sm md:font-normal md:text-xl whitespace-nowrap bg-gray-50 p-2 w-[100%] rounded-md' : 'text-black'
                }
              >
                Manage Winner
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;