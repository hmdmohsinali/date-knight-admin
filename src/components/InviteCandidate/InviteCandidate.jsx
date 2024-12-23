import React, { useState, useEffect } from 'react';
import InviteModal from './InviteModal';
import LoaderCircle from '../LoaderCircle/LoaderCircle';
import { serverUrl } from '../../../api';
import ViewProfile from '../Sheet/ViewProfile';

const InviteCandidate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitations, setInvitations] = useState(null); // Initialize with null to differentiate between loading and empty state
  const [isLoading, setIsLoading] = useState(true);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isCandidateLoading, setIsCandidateLoading] = useState(false);

  useEffect(() => {
    const fetchInvitations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${serverUrl}getInvitations`);
        const data = await response.json();
        setInvitations(data.invitations || []); // Set to empty array if no invitations
      } catch (error) {
        console.error('Error fetching invitations:', error);
        setInvitations([]); // Set to empty array on error to avoid rendering issues
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  const extractUserIdFromProfileLink = (profileLink) => {
    const segments = profileLink.split('/');
    return segments[segments.length - 1];
  };

  const handleViewProfile = async (invite) => {
    const userId = invite.userId || extractUserIdFromProfileLink(invite.profileLink);
    if (!userId) {
      console.error('User ID not found');
      return;
    }
    try {
      setIsCandidateLoading(true);
      const response = await fetch(`https://date-knight-backend.vercel.app/user/userDetails/${userId}`);
      const data = await response.json();
      setSelectedCandidate(data);
      setIsViewProfileOpen(true);
    } catch (error) {
      console.error('Error fetching candidate details:', error);
    } finally {
      setIsCandidateLoading(false);
    }
  };

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

      {isLoading ? (
        <LoaderCircle />
      ) : invitations && invitations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-[#FFA768]">
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-white">Name</th>
                <th className="py-3 px-6 text-left font-semibold text-white">Email</th>
                <th className="py-3 px-6 text-left font-semibold text-white">Status</th>
                <th className="py-3 px-6 text-left font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((invite, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="py-3 px-6">{invite.name}</td>
                  <td className="py-3 px-6">{invite.email}</td>
                  <td
                    className={`py-3 px-6 ${
                      invite.status === 'Accepted' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {invite.status}
                  </td>
                  <td className="py-3 px-6">
                    {invite.status === 'Accepted' ? (
                      <button
                        className="text-orange-500 hover:underline"
                        onClick={() => handleViewProfile(invite)}
                        disabled={isCandidateLoading}
                      >
                        View Profile
                      </button>
                    ) : (
                      <span className="text-gray-500">View Profile</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No invitations found.</p>
      )}

      {/* Removed the button from here */}
      
      {/* Modal Components */}
      <InviteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ViewProfile
        isOpen={isViewProfileOpen}
        onClose={() => setIsViewProfileOpen(false)}
        candidate={selectedCandidate}
      />
    </div>
  );
};

export default InviteCandidate;
