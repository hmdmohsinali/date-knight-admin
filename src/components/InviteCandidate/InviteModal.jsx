import React, { useState } from 'react';

const InviteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-orange-400 hover:text-orange-500"
        >
          &times;
        </button>

        {/* Modal Content */}
        <h2 className="text-center text-lg font-semibold text-orange-400 mb-5">
          Send an Invitation
        </h2>

        {/* Name Input */}
        <div className="mb-4">
          <input
            type="text"
            className="block w-full bg-transparent border-b-2 border-orange-200 focus:border-orange-400 outline-none placeholder-orange-200 text-sm text-gray-700"
            placeholder="Name"
          />
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <input
            type="email"
            className="block w-full bg-transparent border-b-2 border-orange-200 focus:border-orange-400 outline-none placeholder-orange-200 text-sm text-gray-700"
            placeholder="Email"
          />
        </div>

        {/* Invite Button */}
        <div className="flex justify-center">
          <button className="bg-orange-400 text-white text-sm font-semibold py-2 px-6 rounded-full hover:bg-orange-500">
            + Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
