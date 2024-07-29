import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import Candidateappsheet from '../Sheet/Candidateappsheet';

const CandidateApproval = ({ onProfileClick }) => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },

  ];

  const handleProfileClick = (profile) => {

  

    const profileContent = (
      <>


        <div>
          <div>Name:</div>
          <div>{profile.name}</div>
          <br />
          <div>Email:</div>
          <div>{profile.email}</div>
        </div>
        <div>
          {profile.details && (
            <>
              <div>Github:</div>
              <div>{profile.details.github}</div>
              <br />
              <div>Skills</div>
              <div>{profile.details.skills}</div>
            </>
          )}
        </div>


      </>

    );

    

    onProfileClick(
       profileContent,
       profile.details.image
  );
  };


  return (
    <div className='px-8 py-4'>

      {/*Header  */}
      <div className='flex items-center h-10 justify-between py-6 ' >
        <h2 className='font-extrabold text-2xl text-[#FFA764] '>CandidateApproval</h2>
        <FaRegUserCircle className='text-[#FFA764] text-xl' />
      </div>

      {/*DashBoard heading */}
      <h3 className='text-2xl text-[#FFA764] font-normal '>Dashboard</h3>

      {/*charts div */}
      <div className='w-[100%] flex gap-10 h-[250px] mt-6'>

        {/*1st barchart */}
        <div className='p-6 rounded-md border-2 border-gray-700 w-[50%]'>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={data}>
              <Bar dataKey="uv" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/*Items Throught Object */}
      <Candidateappsheet onProfileClick={handleProfileClick} />

     

    </div>
  )
}

export default CandidateApproval
