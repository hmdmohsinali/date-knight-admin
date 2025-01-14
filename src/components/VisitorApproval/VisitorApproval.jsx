import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApprovalSheet from '../Sheet/ApprovalSheet';

const VisitorApproval = ({ onProfileClick }) => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [showLogout, setShowLogout] = useState(false);

  // Fetch data for weekly signups
  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await axios.get(`${serverUrl}weeklyDatar`); // Adjust API endpoint as needed
        const formattedData = response.data.data.map((item) => ({
          day: item._id,
          signups: item.count,
        }));
        setWeeklyData(formattedData);
      } catch (error) {
        console.error("Error fetching weekly data:", error);
      }
    };

    fetchWeeklyData();
  }, []);

  // Fetch data for monthly signups
  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get(`${serverUrl}yearlyData`); // Adjust API endpoint as needed
        const formattedData = response.data.data.map((item) => ({
          month: item._id,
          signups: item.count,
        }));
        setMonthlyData(formattedData);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };

    fetchMonthlyData();
  }, []);

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
              <div>Location:</div>
              <div>{profile.details.location}</div>
              <br />
              <div>Last Name:</div>
              <div>{profile.details.lastname}</div>
            </>
          )}
        </div>
      </>
    );
    onProfileClick(profileContent);
  };

  
  const toggleLogout = () => {
    setShowLogout(prevShowLogout => !prevShowLogout);
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className='px-8 py-4'>
      {/*Header  */}
      <div className='flex items-center h-10 justify-between py-6'>
        <h2 className='font-extrabold text-3xl text-[#FFA764] mt-10 '>Visitor Approval</h2>
        <div className="relative">
          <FaRegUserCircle
            className='text-[#FFA764] text-xl cursor-pointer'
            onClick={toggleLogout}
          />
          {showLogout && (
            <button
              onClick={handleLogout}
              className="absolute right-0 mt-2 bg-[#FFA768] text-[white] p-2 rounded shadow-lg"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/*Dashboard heading */}
      <h3 className='text-2xl text-[#FFA764] font-normal mt-6 '>Dashboard</h3>

      {/*charts div */}
      <div className='w-[100%] flex gap-10 h-[250px] mt-6'>
        <div style={{
          backgroundColor: '#f8f5f0',
          borderRadius: '15px',
          padding: '20px',
          width: '50%',
          height: '100%',
        }}>
          <h4 className='text-center text-lg font-semibold mb-4'>Total Signups This Week</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyData}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip />
              <Legend wrapperStyle={{ top: -20 }} />
              <Bar dataKey="signups" fill="#8B4513" barSize={10} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          backgroundColor: '#f8f5f0',
          borderRadius: '15px',
          padding: '20px',
          width: '50%',
          height: '100%',
        }}>
          <h4 className='text-center text-lg font-semibold mb-4'>Total Signups This Year</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip />
              <Legend wrapperStyle={{ top: -20 }} />
              <Bar dataKey="signups" fill="#8B4513" barSize={10} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/*Items Throught Object */}
      <ApprovalSheet onProfileClick={handleProfileClick} span={<span className='span'>Hey who are you Lorem ipsum dolor sit amet consectetur adipisicing elit. Id</span>} />
    </div>
  );
}

export default VisitorApproval;









