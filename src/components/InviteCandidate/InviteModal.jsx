import React, { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../../../api';
import { toast } from 'react-toastify';

const InviteModal = ({ isOpen, onClose }) => {
  // State for name and email inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(''); // State for error handling
  const [success, setSuccess] = useState(''); // State for success message

  if (!isOpen) return null;

  const handleInvite = async () => {
    setLoading(true); // Set loading state to true before API call
    setError(''); // Reset any previous errors
    setSuccess(''); // Reset any previous success message

    try {
      // Make API call to invite endpoint
      await axios.post(`${serverUrl}invite`, { name, email });
      setSuccess('Invitation sent successfully!');
      setName(''); // Reset name input
      setEmail(''); // Reset email input
      onClose();
      toast.success(`Invitation sent successfully to ${name}!`);
    } catch (error) {
      console.error('Error sending invitation:', error);
      setError('Failed to send invitation.'); // Set error message
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
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
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
          />
        </div>

        {/* Email Input */}
        <div className="mb-8">
          <input
            type="email"
            className="block w-full bg-transparent border-b border-orange-300 focus:border-orange-500 outline-none placeholder-orange-300 text-base text-gray-800"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Success Message */}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        {/* Invite Button */}
        <div className="flex justify-center">
          <button
            className="bg-orange-500 text-white text-base font-semibold py-2 px-8 rounded hover:bg-orange-600 transition-colors disabled:bg-gray-400"
            onClick={handleInvite}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Inviting...' : '+ Invite'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
