import React, { useState, useEffect } from 'react';
import InviteModal from './InviteModal';
import { serverUrl } from '../../../api';

const InviteCandidate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {

    const fetchInvitations = async () => {
      try {
        const response = await fetch(`${serverUrl}getInvitations`); 
        const data = await response.json();
        setInvitations(data.invitations);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      }
    };

    fetchInvitations();
  }, []);

  return (
    <div className="p-6 md:p-8 rounded-lg shadow-md">
      <h2 className="text-3xl mt-6 font-bold text-orange-500 mb-6 text-left">
        Invite Candidate
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-[#FFA768]">
            <tr>
              <th className="py-3 px-6 text-left font-semibold text-amber-950">Name</th>
              <th className="py-3 px-6 text-left font-semibold text-amber-950">Email</th>
              <th className="py-3 px-6 text-left font-semibold text-amber-950">Status</th>
              <th className="py-3 px-6 text-left font-semibold text-amber-950">Action</th>
            </tr>
          </thead>
          <tbody>
            {invitations.map((invite, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-3 px-6">{invite.name}</td>
                <td className="py-3 px-6">{invite.email}</td>
                <td className={`py-3 px-6 ${invite.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>
                  {invite.status}
                </td>
                <td className="py-3 px-6 text-orange-500">
                  {invite.profileLink ? (
                    <a href={invite.profileLink} className="hover:underline">
                      View Profile
                    </a>
                  ) : (
                    'View Profile'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-end mt-6'>
        <button
          className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600"
          onClick={() => setIsModalOpen(true)}
        >
          + Invite
        </button>

        <InviteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default InviteCandidate;
