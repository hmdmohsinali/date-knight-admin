import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../../../api';

const Modal = ({ message, type, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-1/3">
        <h2 className={`text-2xl font-bold mb-4 ${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {type === 'success' ? 'Success' : 'Error'}
        </h2>
        <p className="text-gray-700 text-lg mb-6">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const AcceptInvitation = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    contact: '',
    address: '',
    token: ''
  });
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalOnError, setShowModalOnError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      setFormData((prevData) => ({ ...prevData, token }));
    } else {
      setModalType('error');
      setModalMessage('Invalid or missing token.');
      setShowModalOnError(true);
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setModalType('error');
      setModalMessage('Passwords do not match.');
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(`${serverUrl}accept-invitation`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setModalType('success');
        setModalMessage('Invitation accepted successfully!');
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalType('error');
      setModalMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setIsModalOpen(true);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowModalOnError(false);
    setModalMessage('');
    setModalType('');
  };

  useEffect(() => {
    if (showModalOnError) {
      setIsModalOpen(true);
    }
  }, [showModalOnError]);

  return (
    <div className="max-w-md mx-auto p-8 mt-2 bg-white shadow-lg rounded-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Accept Invitation</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0A8 8 0 014 12z"/>
              </svg>
              Loading...
            </div>
          ) : (
            'Accept Invitation'
          )}
        </button>
      </form>

      {isModalOpen && (
        <Modal
          message={modalMessage}
          type={modalType}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AcceptInvitation;
