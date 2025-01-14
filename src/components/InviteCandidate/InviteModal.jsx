// import React, { useState } from 'react';
// import axios from 'axios';
// import { serverUrl } from '../../../api';
// import { toast } from 'react-toastify';

// const InviteModal = ({ isOpen, onClose }) => {
//   // State for name and email inputs
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false); // State for loading indicator
//   const [error, setError] = useState(''); // State for error handling
//   const [success, setSuccess] = useState(''); // State for success message

//   if (!isOpen) return null;

//   // Function to handle closing of the modal and resetting the state
//   const handleClose = () => {
//     setName(''); // Reset name input
//     setEmail(''); // Reset email input
//     setError(''); // Reset error state
//     setSuccess(''); // Reset success message
//     onClose(); // Close the modal
//   };

//   const handleInvite = async () => {
//     setLoading(true); 
//     setError('');
//     setSuccess('');

//     try {
      
//       const response = await axios.post(`${serverUrl}invite`, { name, email });
//       setSuccess('Invitation sent successfully!');
//       toast.success(`Invitation sent successfully to ${name}!`);
//       handleClose();
//       window.location.reload()
//     } catch (error) {
//       toast.error('Error sending invitation:', error);
//       setError('Failed to send invitation.'); 
//     } finally {
//       setLoading(false); 
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
//       <div className="bg-white rounded-xl shadow-lg p-14 w-96 relative">
//         {/* Close button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-3 right-3 text-orange-400 text-2xl leading-none hover:text-orange-500"
//         >
//           &times;
//         </button>

//         {/* Modal Content */}
//         <h2 className="text-center text-2xl font-semibold text-orange-500 mb-8">
//           Send an Invitation
//         </h2>

//         {/* Name Input */}
//         <div className="mb-8">
//           <input
//             type="text"
//             className="block w-full bg-transparent border-b border-orange-300 focus:border-orange-500 outline-none placeholder-orange-300 text-base text-gray-800"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)} // Update name state
//           />
//         </div>

//         {/* Email Input */}
//         <div className="mb-8">
//           <input
//             type="email"
//             className="block w-full bg-transparent border-b border-orange-300 focus:border-orange-500 outline-none placeholder-orange-300 text-base text-gray-800"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)} // Update email state
//           />
//         </div>

//         {/* Error Message */}
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         {/* Success Message */}
//         {success && <p className="text-green-500 text-center mb-4">{success}</p>}

//         {/* Invite Button */}
//         <div className="flex justify-center">
//           <button
//             className="bg-orange-500 text-white text-base font-semibold py-2 px-8 rounded hover:bg-orange-600 transition-colors disabled:bg-gray-400"
//             onClick={handleInvite}
//             disabled={loading} // Disable button while loading
//           >
//             {loading ? 'Inviting...' : '+ Invite'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InviteModal;








// src/components/InviteCandidate/InviteModal.jsx
import React, { useState, useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { CandidateContext } from './CandidateContext';

const InviteModal = ({ isOpen, onClose }) => {
  // Access inviteCandidate from context
  const { inviteCandidate } = useContext(CandidateContext);
  
  // State for name and email inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false); // State for loading indicator

  if (!isOpen) return null;

  // Function to handle closing of the modal and resetting the state
  const handleClose = () => {
    setName(''); // Reset name input
    setEmail(''); // Reset email input
    onClose(); // Close the modal
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error('Please provide both name and email.');
      return;
    }

    setSubmitting(true); 
    try {
      await inviteCandidate(name.trim(), email.trim());
      toast.success(`Invitation sent successfully to ${name}!`);
      handleClose();
    } catch (error) {
      // Error handling is managed in the context
      // Additional error feedback can be provided here if needed
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-orange-400 text-2xl leading-none hover:text-orange-500"
        >
          <FaTimes />
        </button>

        {/* Modal Content */}
        <h2 className="text-center text-2xl font-semibold text-orange-500 mb-6">
          Send an Invitation
        </h2>

        <form onSubmit={handleInvite}>
          {/* Name Input */}
          <div className="mb-6">
            <input
              type="text"
              className="block w-full bg-transparent border-b border-orange-300 focus:border-orange-500 outline-none placeholder-orange-300 text-base text-gray-800"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <input
              type="email"
              className="block w-full bg-transparent border-b border-orange-300 focus:border-orange-500 outline-none placeholder-orange-300 text-base text-gray-800"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
          </div>

          {/* Invite Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 text-white text-base font-semibold py-2 px-8 rounded hover:bg-orange-600 transition-colors disabled:bg-gray-400"
              disabled={submitting} // Disable button while submitting
            >
              {submitting ? 'Inviting...' : '+ Invite'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;


