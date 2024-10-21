import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai'; // You can use any icon you prefer

const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 w-full max-w-md mx-4 md:mx-0">
        <div className="text-center">
          <AiOutlineCheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Success!</h2>
          <p className="text-lg text-gray-700 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
