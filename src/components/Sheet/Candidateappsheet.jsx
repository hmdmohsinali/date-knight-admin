import React, { useState } from 'react';
import { IoBan } from "react-icons/io5";
import { FaCircleExclamation } from "react-icons/fa6";
import { BsToggleOn,BsToggleOff } from "react-icons/bs";
// import img from '../../assets/img.png';
const data = [
    {
        name: 'Kong Jeo',
        email: 'kongjeo@gmail.com',
        profile: 'view profile',
        Approve: <BsToggleOn />,
        Action: <IoBan />,
        banPeriod: '5 months',
        details: {
            github: "https://kongjeo.git",
            skills: "web devlopment",
            image: '../../assets/img.png',
        }
    },
];

const Table = ({ onProfileClick }) => {

    const [toggleStates, setToggleStates] = useState(
        data.reduce((acc, _, index) => {
            acc[index] = true; // Initialize each toggle state to true
            return acc;
        }, {})
    );

    const handleClick = (index) => {
        setToggleStates((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };


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

                            </th>
                            <th className='w-[23%]  px-3 uppercase font-semibold text-sm whitespace-nowrap'>Ban Period</th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-700'>
                        {data.map((item, index) => (
                            <tr key={index} className='rows'>
                                <td className='w-[20%] py-2 px-4'>{item.name}</td>
                                <td className='w-[25%] py-2 px-4'>{item.email}</td>
                                <td className='w-[20%] py-2 px-4'><button onClick={() => onProfileClick(item)}>{item.profile} </button></td>
                                <td className='w-[16%] py-2 px-14 text-2xl text-[#892525]' onClick={() => handleClick(index)}> {toggleStates[index] ? (
                                    <BsToggleOn className='text-brown transition-colors duration-300' />
                                ) : (
                                    <BsToggleOff className='text-gray-500 transition-colors duration-300' />
                                )}  </td>
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