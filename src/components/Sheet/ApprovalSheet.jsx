// import React, { useState, useEffect } from 'react';
// import { FaBan, FaInfoCircle } from 'react-icons/fa';
// import ViewProfile from './ViewProfile'; // Import the ViewProfile component
// import LoaderCircle from '../LoaderCircle/LoaderCircle';
// import 'daisyui/dist/full.css';
// import 'tailwindcss/tailwind.css';
// import axios from 'axios';
// import { serverUrl } from '../../../api';
// import DatePicker from 'react-datepicker';  // New library
// import 'react-datepicker/dist/react-datepicker.css'; // CSS for react-datepicker

// const formatDate = (dateString) => {
//   if (!dateString) return 'Not Banned';
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     month: '2-digit',
//     day: '2-digit',
//     year: 'numeric',
//   });
// };

// const ManageCandidate = () => {
//   const [toggleStates, setToggleStates] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [activePickerIndex, setActivePickerIndex] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         setLoading(true); // Start loader
//         const response = await fetch(`${serverUrl}allUser`);
//         const data = await response.json();

//         const formattedData = data.map((item) => ({
//           name: item.name,
//           email: item.email,
//           profile: 'View Profile',
//           contestant: item.isCandidate,
//           // approve: item.isApproved, // Approve field commented out
//           banPeriod: item.isBanned ? `Banned until ${item.bannedUntil || 'unknown'}` : 'Not Banned',
//           otp: item.otp,
//           otpExpiresAt: item.otpExpiresAt,
//           isBanned: item.isBanned,
//           bannedUntil: item.bannedUntil,
//           id: item._id,
//           username: item.username,
//           password: item.password,
//           contact: item.contact,
//           address: item.address,
//           facebookUrl: item.facebookUrl,
//           instagramUrl: item.instagramUrl,
//           profilePic: item.profilePic,
//           coverPic: item.coverPic,
//           verified: item.verified,
//           followedEvents: item.followedEvents,
//           experiences: item.experiences,
//           createdAt: item.createdAt,
//           updatedAt: item.updatedAt,
//           version: item.__v,
//         }));

//         setToggleStates(formattedData);
//       } catch (error) {
//         console.error('Error fetching candidates:', error);
//       } finally {
//         setLoading(false); // Stop loader
//       }
//     };

//     fetchCandidates();
//   }, []);

//   const handleToggleChange = async (index, field) => {
//     const id = toggleStates[index].id;
//     try {
//       setLoading(true); // Start loader
//       if (field === 'contestant') {
//         const newValue = !toggleStates[index][field];
//         const response = await axios.put(`${serverUrl}toggleIsCandidate/${id}`, {
//           isCandidate: newValue,
//         });
//         if (response.data.message === 'isCandidate toggled') {
//           setToggleStates((prevState) => {
//             const newState = prevState.map((item, i) =>
//               i === index ? { ...item, [field]: newValue } : item
//             );
//             return newState;
//           });
//         }
//       } 
//       // else if (field === 'approve') { // Approve toggle logic commented out
//       //   const newValue = !toggleStates[index][field];
//       //   const response = await axios.put(`${serverUrl}toggleIsApproved/${id}`, {
//       //     isApproved: newValue,
//       //   });
//       //   if (response.data.message === 'isApproved toggled') {
//       //     setToggleStates((prevState) => {
//       //       const newState = prevState.map((item, i) =>
//       //         i === index ? { ...item, [field]: newValue } : item
//       //       );
//       //       return newState;
//       //     });
//       //   }
//       // } 
//       else {
//         setToggleStates((prevState) => {
//           const newState = prevState.map((item, i) =>
//             i === index ? { ...item, [field]: !item[field] } : item
//           );
//           return newState;
//         });
//       }
//     } catch (error) {
//       console.error('Error updating candidate:', error);
//     } finally {
//       setLoading(false); // Stop loader
//     }
//   };

//   const handleViewProfile = (candidate) => {
//     setSelectedCandidate(candidate);
//     setIsProfileOpen(true);
//   };

//   const handleDateSelect = async (selectedDate, index) => {
//     if (!selectedDate) {
//       // User cancelled the date selection
//       return;
//     }

//     // selectedDate format: "X Years Y Months Z Days"
//     const dateParts = selectedDate.match(/(\d+)\s*Years\s*(\d+)\s*Months\s*(\d+)\s*Days/);

//     if (!dateParts) {
//       console.error('Invalid date format:', selectedDate);
//       return;
//     }

//     const [_, years, months, days] = dateParts;
//     const id = toggleStates[index].id;

//     try {
//       setLoading(true);

//       const banDuration = {
//         years: years.toString(),
//         months: months.toString(),
//         days: days.toString(),
//       };

//       const response = await axios.put(`${serverUrl}banUser/${id}`, banDuration);

//       if (response.status === 200) {
//         // Update the state with the new ban period
//         setToggleStates((prevState) => {
//           const newState = prevState.map((item, i) =>
//             i === index
//               ? {
//                   ...item,
//                   banPeriod: `Banned until ${formatDate(response.data.bannedUntil)}`,
//                   isBanned: true,
//                   bannedUntil: response.data.bannedUntil,
//                 }
//               : item
//           );
//           return newState;
//         });
//       }
//     } catch (error) {
//       console.error('Error banning user:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // New BanDatePicker component integrated here
//   const BanDatePicker = ({ onDateSelect, onClose }) => {
//     const [startDate, setStartDate] = useState(new Date());

//     const handleSetDate = () => {
//       const now = new Date();
//       const selected = startDate;
//       const diffTime = selected - now;

//       if (diffTime <= 0) {
//         // If selected date is now or in the past, set 0 Years 0 Months 0 Days
//         onDateSelect("0 Years 0 Months 0 Days");
//         onClose();
//         return;
//       }

//       // Calculate difference roughly:
//       let years = selected.getFullYear() - now.getFullYear();
//       let months = selected.getMonth() - now.getMonth();
//       let days = selected.getDate() - now.getDate();

//       if (days < 0) {
//         months--;
//         days += new Date(selected.getFullYear(), selected.getMonth(), 0).getDate();
//       }

//       if (months < 0) {
//         years--;
//         months += 12;
//       }

//       const selectedDateStr = `${years} Years ${months} Months ${days} Days`;
//       onDateSelect(selectedDateStr);
//       onClose();
//     };

//     const handleCancel = () => onClose();

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-50">
//         {/* Overlay */}
//         <div className="fixed inset-0 bg-black opacity-50" onClick={handleCancel}></div>

//         {/* Modal Content */}
//         <div className="bg-white p-4 shadow-lg rounded-lg z-50 w-72">
//           <DatePicker 
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             inline
//           />
//           <div className="footer flex justify-end space-x-4 mt-4">
//             <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={handleCancel}>
//               Cancel
//             </button>
//             <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSetDate}>
//               Set
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="py-4 scrollable-container">
//       {loading && <LoaderCircle />}
//       <div className="rounded-lg border-gray-300">
//         <table className="w-full bg-white border-collapse text-center">
//           <thead className="bg-[#FFA768] text-white rounded-lg h-12">
//             <tr>
//               <th className="px-3 uppercase font-semibold text-sm">Name</th>
//               <th className="px-3 uppercase font-semibold text-sm">Email</th>
//               <th className="px-3 uppercase font-semibold text-sm">Profile</th>
//               <th className="px-3 uppercase font-semibold text-sm">Contestant?</th>
//               {/* <th className="px-3 uppercase font-semibold text-sm">Approve</th> */}
//               <th className="px-3 uppercase font-semibold text-sm whitespace-nowrap">
//                 Action
//                 <div
//                   className="tooltip tooltip-bottom ml-2"
//                   data-tip="This will grant you the authority to ban individuals for a certain time frame"
//                 >
//                   <FaInfoCircle className="ml-2 inline-block text-white" />
//                 </div>
//               </th>
//               <th className="px-3 uppercase font-semibold text-sm">Ban Period</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {toggleStates.map((item, index) => (
//               <tr key={index} className="rows">
//                 <td className="py-4 px-4">{item.name}</td>
//                 <td className="py-4 px-4">{item.email}</td>
//                 <td className="py-4 px-4">
//                   <a href="#" className="" onClick={() => handleViewProfile(item)}>
//                     {item.profile}
//                   </a>
//                 </td>
//                 <td className="py-4 px-4">
//                   <input
//                     type="checkbox"
//                     className="toggle toggle-md checked:bg-orange-500"
//                     checked={item.contestant}
//                     onChange={() => handleToggleChange(index, 'contestant')}
//                   />
//                 </td>
//                 {/* Approve toggle commented out */}
//                 {/* 
//                 <td className="py-4 px-4">
//                   <input
//                     type="checkbox"
//                     className="toggle toggle-md checked:bg-orange-500"
//                     checked={item.approve}
//                     onChange={() => handleToggleChange(index, 'approve')}
//                   />
//                 </td> 
//                 */}
//                 <td className="py-4 px-4 relative">
//                   <button
//                     className=""
//                     data-tip="Ban this candidate"
//                     onClick={() => setActivePickerIndex(index)}
//                   >
//                     <FaBan className="text-xl " />
//                   </button>
//                   {activePickerIndex === index && (
//                     <BanDatePicker
//                       onDateSelect={(selectedDate) => handleDateSelect(selectedDate, index)}
//                       onClose={() => setActivePickerIndex(null)}
//                     />
//                   )}
//                 </td>
//                 <td className="py-4 px-4">{formatDate(item.bannedUntil)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <ViewProfile
//         candidate={selectedCandidate}
//         isOpen={isProfileOpen}
//         onClose={() => setIsProfileOpen(false)}
//       />
//     </div>
//   );
// };

// export default ManageCandidate;








// src/components/ManageCandidate/ManageCandidate.jsx
import React, { useContext, useState } from 'react';
import { FaBan, FaInfoCircle } from 'react-icons/fa';
import LoaderCircle from '../LoaderCircle/LoaderCircle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CandidateContext } from '../InviteCandidate/CandidateContext';
import { toast } from 'react-toastify'; // Ensure toast is imported
import axios from 'axios';
import { serverUrl } from '../../../api';
import ViewProfile from './ViewProfile';

const formatDate = (dateString) => {
  if (!dateString) return 'Not Banned';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};

const ManageCandidate = () => {
  const { managedCandidates, toggleContestantStatus, updateBanPeriod, loading } = useContext(CandidateContext);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [activePickerId, setActivePickerId] = useState(null);
  const [banLoading, setBanLoading] = useState(false); // Separate loading state for banning

  const handleToggleChange = (id, currentStatus, name) => {
    // Removed window.confirm
    toggleContestantStatus(id, currentStatus, false); // 'false' since toggling from managedCandidates
  };

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setIsViewProfileOpen(true);
  };

  const handleDateSelect = async (selectedDate, id) => {
    if (!selectedDate) {
      // User cancelled the date selection
      return;
    }

    // selectedDate format: "X Years Y Months Z Days"
    const dateParts = selectedDate.match(/(\d+)\s*Years\s*(\d+)\s*Months\s*(\d+)\s*Days/);

    if (!dateParts) {
      console.error('Invalid date format:', selectedDate);
      toast.error('Invalid date format selected.');
      return;
    }

    const [_, years, months, days] = dateParts;

    try {
      setBanLoading(true);
      const banDuration = {
        years: years.toString(),
        months: months.toString(),
        days: days.toString(),
      };

      const response = await axios.put(`${serverUrl}banUser/${id}`, banDuration);
      if (response.status === 200) {
        // Update the context with the new ban period
        updateBanPeriod(id, response.data);
        toast.success('Ban period updated successfully.');
      } else {
        toast.error('Failed to update ban period.');
      }
    } catch (error) {
      console.error('Error banning user:', error);
      toast.error('Failed to ban user.');
    } finally {
      setBanLoading(false);
    }
  };

  // BanDatePicker Component
  const BanDatePicker = ({ onDateSelect, onClose }) => {
    const [startDate, setStartDate] = useState(new Date());

    const handleSetDate = () => {
      const now = new Date();
      const selected = startDate;
      const diffTime = selected - now;

      if (diffTime <= 0) {
        // If selected date is now or in the past, set 0 Years 0 Months 0 Days
        onDateSelect("0 Years 0 Months 0 Days");
        onClose();
        return;
      }

      // Calculate difference roughly:
      let years = selected.getFullYear() - now.getFullYear();
      let months = selected.getMonth() - now.getMonth();
      let days = selected.getDate() - now.getDate();

      if (days < 0) {
        months--;
        days += new Date(selected.getFullYear(), selected.getMonth(), 0).getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      const selectedDateStr = `${years} Years ${months} Months ${days} Days`;
      onDateSelect(selectedDateStr);
      onClose();
    };

    const handleCancel = () => onClose();

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-50" onClick={handleCancel}></div>

        {/* Modal Content */}
        <div className="bg-white p-4 shadow-lg rounded-lg z-50 w-72">
          <DatePicker 
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
          />
          <div className="footer flex justify-end space-x-4 mt-4">
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={handleCancel}>
              Cancel
            </button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSetDate}>
              Set
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-4 scrollable-container">
      {loading && <LoaderCircle />}
      <div className="rounded-lg border-gray-300">
        <table className="w-full bg-white border-collapse text-center">
          <thead className="bg-[#FFA768] text-white rounded-lg h-12">
            <tr>
              <th className="px-3 uppercase font-semibold text-sm">Name</th>
              <th className="px-3 uppercase font-semibold text-sm">Email</th>
              <th className="px-3 uppercase font-semibold text-sm">Profile</th>
              <th className="px-3 uppercase font-semibold text-sm">Contestant?</th>
              <th className="px-3 uppercase font-semibold text-sm whitespace-nowrap">
                Action
                <div
                  className="tooltip tooltip-bottom ml-2"
                  data-tip="This will grant you the authority to ban individuals for a certain time frame"
                >
                  <FaInfoCircle className="ml-2 inline-block text-white" />
                </div>
              </th>
              <th className="px-3 uppercase font-semibold text-sm">Ban Period</th>
              <th className="px-3 uppercase font-semibold text-sm">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {managedCandidates.map((item) => (
              <tr key={item.id} className="rows">
                <td className="py-4 px-4">{item.name}</td>
                <td className="py-4 px-4">{item.email}</td>
                <td className="py-4 px-4">
                  <a href="#" onClick={() => handleViewProfile(item)} className="text-blue-500 hover:underline">
                    {item.profile}
                  </a>
                </td>
                <td className="py-4 px-4">
                  {/* Enabled Contestant Toggle */}
                  <input
                    type="checkbox"
                    className="toggle toggle-md checked:bg-orange-500"
                    checked={item.isCandidate}
                    onChange={() => handleToggleChange(item.id, item.isCandidate, item.name)}
                  />
                </td>
                <td className="py-4 px-4 relative">
                  <button
                    className=""
                    data-tip="Ban this candidate"
                    onClick={() => setActivePickerId(item.id)}
                  >
                    <FaBan className="text-xl " />
                  </button>
                  {activePickerId === item.id && (
                    <BanDatePicker
                      onDateSelect={(selectedDate) => handleDateSelect(selectedDate, item.id)}
                      onClose={() => setActivePickerId(null)}
                    />
                  )}
                </td>
                <td className="py-4 px-4">{formatDate(item.bannedUntil)}</td>
                <td className={`py-4 px-4 font-semibold ${
                  item.isBanned ? 'text-red-500' : 'text-green-500'
                }`}>
                  {item.isBanned ? 'Banned' : 'Active'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ViewProfile
        candidate={selectedCandidate}
        isOpen={isViewProfileOpen}
        onClose={() => setIsViewProfileOpen(false)}
      />
      {banLoading && <LoaderCircle />}
    </div>
  );
};

export default ManageCandidate;














