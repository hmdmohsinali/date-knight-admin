import React, { useState } from 'react';

const InviteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-1 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-80 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-orange-400 text-2xl leading-none hover:text-orange-500"
        >
          &times;
        </button>

        {/* Modal Content */}
        <h2 className="text-center text-xl font-semibold text-orange-500 mb-8">
          Send an Invitation
        </h2>

        {/* Name Input */}
        <div className="mb-5">
          <input
            type="text"
            className="block w-full bg-transparent border-b border-orange-300 focus:border-orange-500 outline-none placeholder-orange-300 text-base text-gray-800"
            placeholder="Name"
          />
        </div>

        {/* Email Input */}
        <div className="mb-8">
          <input
            type="email"
            className="block w-full bg-transparent border-b border-orange-300 focus:border-orange-500 outline-none placeholder-orange-300 text-base text-gray-800"
            placeholder="Email"
          />
        </div>

        {/* Invite Button */}
        <div className="flex justify-center">
          <button className="bg-orange-500 text-white text-base font-semibold py-2 px-8 rounded hover:bg-orange-600 transition-colors">
            + Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
