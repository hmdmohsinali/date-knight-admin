import React, { useState } from 'react';
import InviteModal from './InviteModal'

const InviteCandidate = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className=" p-6 md:p-8 rounded-lg shadow-md">
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
            <tr className="border-b last:border-none">
              <td className="py-3 px-6">Janice Han</td>
              <td className="py-3 px-6">janicehan@gmail.com</td>
              <td className="py-3 px-6 text-red-500">Pending</td>
              <td className="py-3 px-6 text-orange-500">
                <a href="#" className="hover:underline">
                  View Profile
                </a>
              </td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="py-3 px-6">Name 2</td>
              <td className="py-3 px-6">name@two.com</td>
              <td className="py-3 px-6 text-green-500">Accepted</td>
              <td className="py-3 px-6 text-orange-500">
                <a href="#" className="hover:underline">
                  View Profile
                </a>
              </td>
            </tr>
            <tr className="last:border-none">
              <td className="py-3 px-6">Name 3</td>
              <td className="py-3 px-6">name@three.com</td>
              <td className="py-3 px-6 text-green-500">Accepted</td>
              <td className="py-3 px-6 text-orange-500">
                <a href="#" className="hover:underline">
                  View Profile
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='flex justify-end mt-6'>
      {/* Invite Button */}
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
