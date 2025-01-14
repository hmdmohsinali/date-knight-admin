// import React, { useState, useEffect } from 'react';
// import InviteModal from './InviteModal';
// import LoaderCircle from '../LoaderCircle/LoaderCircle';
// import { serverUrl } from '../../../api';
// import ViewProfile from '../Sheet/ViewProfile';

// const InviteCandidate = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [invitations, setInvitations] = useState(null); // Initialize with null to differentiate between loading and empty state
//   const [isLoading, setIsLoading] = useState(true);
//   const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [isCandidateLoading, setIsCandidateLoading] = useState(false);

//   useEffect(() => {
//     const fetchInvitations = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${serverUrl}getInvitations`);
//         const data = await response.json();
//         setInvitations(data.invitations || []); // Set to empty array if no invitations
//       } catch (error) {
//         console.error('Error fetching invitations:', error);
//         setInvitations([]); // Set to empty array on error to avoid rendering issues
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchInvitations();
//   }, []);

//   const extractUserIdFromProfileLink = (profileLink) => {
//     const segments = profileLink.split('/');
//     return segments[segments.length - 1];
//   };

//   const handleViewProfile = async (invite) => {
//     const userId = invite.userId || extractUserIdFromProfileLink(invite.profileLink);
//     if (!userId) {
//       console.error('User ID not found');
//       return;
//     }
//     try {
//       setIsCandidateLoading(true);
//       const response = await fetch(`https://date-knight-backend.vercel.app/user/userDetails/${userId}`);
//       const data = await response.json();
//       setSelectedCandidate(data);
//       setIsViewProfileOpen(true);
//     } catch (error) {
//       console.error('Error fetching candidate details:', error);
//     } finally {
//       setIsCandidateLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 md:p-8 rounded-lg shadow-md">
//       {/* Header Section with Title and Invite Button */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold text-orange-500">
//           Invite Candidate
//         </h2>
//         <button
//           className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600"
//           onClick={() => setIsModalOpen(true)}
//         >
//           + Invite
//         </button>
//       </div>

//       {isLoading ? (
//         <LoaderCircle />
//       ) : invitations && invitations.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white rounded-lg">
//             <thead className="bg-[#FFA768]">
//               <tr>
//                 <th className="py-3 px-6 text-left font-semibold text-white">Name</th>
//                 <th className="py-3 px-6 text-left font-semibold text-white">Email</th>
//                 <th className="py-3 px-6 text-left font-semibold text-white">Status</th>
//                 <th className="py-3 px-6 text-left font-semibold text-white">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {invitations.map((invite, index) => (
//                 <tr key={index} className="border-b last:border-none">
//                   <td className="py-3 px-6">{invite.name}</td>
//                   <td className="py-3 px-6">{invite.email}</td>
//                   <td
//                     className={`py-3 px-6 ${
//                       invite.status === 'Accepted' ? 'text-green-500' : 'text-red-500'
//                     }`}
//                   >
//                     {invite.status}
//                   </td>
//                   <td className="py-3 px-6">
//                     {invite.status === 'Accepted' ? (
//                       <button
//                         className="text-orange-500 hover:underline"
//                         onClick={() => handleViewProfile(invite)}
//                         disabled={isCandidateLoading}
//                       >
//                         View Profile
//                       </button>
//                     ) : (
//                       <span className="text-gray-500">View Profile</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No invitations found.</p>
//       )}

//       {/* Removed the button from here */}
      
//       {/* Modal Components */}
//       <InviteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//       <ViewProfile
//         isOpen={isViewProfileOpen}
//         onClose={() => setIsViewProfileOpen(false)}
//         candidate={selectedCandidate}
//       />
//     </div>
//   );
// };

// export default InviteCandidate;













// src/components/InviteCandidate/InviteCandidate.jsx
import React, { useContext, useState } from "react";
import InviteModal from './InviteModal';
import LoaderCircle from '../LoaderCircle/LoaderCircle';
import { FaInfoCircle, FaBan } from 'react-icons/fa';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CandidateContext } from "./CandidateContext";
import { serverUrl } from "../../../api";
import ViewProfile from "../Sheet/ViewProfile";

const formatDate = (dateString) => {
  if (!dateString) return 'Not Banned';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};

const InviteCandidate = () => {
  const { candidates, loading, toggleContestantStatus, updateBanPeriod } = useContext(CandidateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [activePickerId, setActivePickerId] = useState(null);
  const [banLoading, setBanLoading] = useState(false); // Separate loading state for banning

  const handleToggleChange = (id, currentStatus, name) => {
    // Optional: Add confirmation before toggling
    if (window.confirm(`Are you sure you want to ${currentStatus ? 'revoke' : 'grant'} contestant status for ${name}?`)) {
      toggleContestantStatus(id, currentStatus);
    } else {
      toast.info('Action cancelled.');
    }
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

  // Filter candidates into invited (pending) and accepted
  const invitedCandidates = candidates.filter(candidate => candidate.isInvited && !candidate.isCandidate);
  const acceptedCandidates = candidates.filter(candidate => candidate.isCandidate);

  return (
    <div className="p-6 md:p-8 rounded-lg shadow-md">
      {/* Header Section with Title and Invite Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-500">
          Invite Candidate
        </h2>
        <button
          className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600"
          onClick={() => setIsModalOpen(true)}
        >
          + Invite
        </button>
      </div>

      {loading ? (
        <LoaderCircle />
      ) : (
        <>
          {/* Search Bar (Optional for Enhanced UX) */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Search by name or email..."
              // Implement search functionality if needed
            />
          </div>

          {/* Combined Table for Invited and Accepted Candidates */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg text-center">
              <thead className="bg-[#FFA768] text-white rounded-lg h-12">
                <tr>
                  <th className="py-3 px-6 uppercase font-semibold text-sm">Name</th>
                  <th className="py-3 px-6 uppercase font-semibold text-sm">Email</th>
                  <th className="py-3 px-6 uppercase font-semibold text-sm">Profile</th>
                  <th className="py-3 px-6 uppercase font-semibold text-sm">Contestant?</th>
                  {/* <th className="py-3 px-6 uppercase font-semibold text-sm">Approve</th> */}
                  <th className="py-3 px-6 uppercase font-semibold text-sm whitespace-nowrap">
                    Action
                    <div
                      className="tooltip tooltip-bottom ml-2"
                      data-tip="This will grant you the authority to ban individuals for a certain time frame"
                    >
                      <FaInfoCircle className="ml-2 inline-block text-white" />
                    </div>
                  </th>
                  <th className="py-3 px-6 uppercase font-semibold text-sm">Ban Period</th>
                  <th className="py-3 px-6 uppercase font-semibold text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {/* Invited Candidates (Pending) */}
                {invitedCandidates.map((item) => (
                  <tr key={item.id} className="rows">
                    <td className="py-4 px-4">{item.name}</td>
                    <td className="py-4 px-4">{item.email}</td>
                    <td className="py-4 px-4">
                      {/* Disabled Profile Link */}
                      <span className="text-gray-500">View Profile</span>
                    </td>
                    <td className="py-4 px-4">
                      {/* Enabled Contestant Toggle to accept invitation */}
                      <input
                        type="checkbox"
                        className="toggle toggle-md checked:bg-orange-500"
                        checked={item.isCandidate}
                        onChange={() => handleToggleChange(item.id, item.isCandidate, item.name)}
                      />
                    </td>
                    {/* Approve toggle remains commented out */}
                    {/*
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        className="toggle toggle-md checked:bg-orange-500"
                        checked={item.approve}
                        onChange={() => handleToggleChange(item.id, 'approve')}
                      />
                    </td>
                    */}
                    <td className="py-4 px-4 relative">
                      {/* Disabled Ban Button */}
                      <button
                        className="text-gray-400 cursor-not-allowed"
                        disabled
                        onClick={() => {}}
                        data-tip="Ban this candidate"
                      >
                        <FaBan className="text-xl " />
                      </button>
                    </td>
                    <td className="py-4 px-4">Not Banned</td>
                    <td className="py-4 px-4 text-yellow-500 font-semibold">Pending</td>
                  </tr>
                ))}

                {/* Accepted Candidates */}
                {acceptedCandidates.map((item) => (
                  <tr key={item.id} className="rows">
                    <td className="py-4 px-4">{item.name}</td>
                    <td className="py-4 px-4">{item.email}</td>
                    <td className="py-4 px-4">
                      <a href="#" onClick={() => handleViewProfile(item)}>
                        {item.profile}
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        className="toggle toggle-md checked:bg-orange-500"
                        checked={item.isCandidate}
                        onChange={() => handleToggleChange(item.id, item.isCandidate, item.name)}
                      />
                    </td>
                    {/* Approve toggle remains commented out */}
                    {/*
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        className="toggle toggle-md checked:bg-orange-500"
                        checked={item.approve}
                        onChange={() => handleToggleChange(item.id, 'approve')}
                      />
                    </td>
                    */}
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
                    <td className="py-4 px-4 text-green-500 font-semibold">Accepted</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal Components */}
      <InviteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ViewProfile
        isOpen={isViewProfileOpen}
        onClose={() => setIsViewProfileOpen(false)}
        candidate={selectedCandidate}
      />
      {banLoading && <LoaderCircle />}
    </div>
  );
};

export default InviteCandidate;





