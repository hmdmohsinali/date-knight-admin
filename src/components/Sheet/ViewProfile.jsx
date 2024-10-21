import React from 'react';
import { MdClose } from 'react-icons/md'; // Import the close icon from react-icons

const ViewProfile = ({ isOpen, onClose, candidate }) => {
  if (!isOpen || !candidate) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-[90vh] max-h-[90vh] relative shadow-lg overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-3  right-3 text-gray-600 hover:text-black"
        >
          <MdClose size={24} /> 
        </button>
        <div className="flex flex-col items-center mb-6">
          {/* Cover Photo */}
          <div className="w-full h-32 border border-orange-400 flex items-center justify-center mb-[-3rem] rounded-t-lg overflow-hidden">
            <img
              src={candidate.coverPic || 'cover-photo-url.jpg'}
              alt="Cover Photo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Photo */}
          <div className="w-24 h-24 border-4 border-white rounded-full overflow-hidden mb-4 relative z-10">
            <img
              src={candidate.profilePic || 'profile-photo-url.jpg'}
              alt="Profile Photo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-2 gap-4 text-sm w-full mt-4">
            <div>
              <strong>Name:</strong> {candidate.name}
            </div>
            <div>
              <strong>Email:</strong> {candidate.email}
            </div>
            <div>
              <strong>Location:</strong> {candidate.address || 'NYC'}
            </div>
            <div>
              <strong>Contact:</strong> {candidate.contact || '6363113138'}
            </div>
            <div>
              <strong>Facebook:</strong> {candidate.facebookUrl}
            </div>
            <div>
              <strong>Instagram:</strong> {candidate.instagramUrl}
            </div>
            <div className="col-span-2 my-4 border-t border-gray-300"></div>
            <div>
              <strong>Is Contestant?:</strong> {candidate.isCandidate ? "Yes":"No"}
            </div>
            <div>
              <strong>Ban Count:</strong> {candidate.banCount || 0}
            </div>
            <div className="col-span-2 my-4 border-t border-gray-300"></div>
            <div className="col-span-2 mt-4">
              <strong>Comments:</strong>
              <p className="mt-1 text-gray-600">
                {candidate.comments || 'No comments available.'}
              </p>
            </div>
            <div className="col-span-2 mt-4 text-center">
              <strong>{candidate.createdAt}</strong>
            </div>
            <div className="col-span-2 my-4 border-t border-gray-300"></div>
            <div>
              <strong>About:</strong>
              <p className="mt-1 text-gray-600">
                {candidate.about || 'No about information available.'}
              </p>
            </div>
            <div className="col-span-2 my-4 border-t border-gray-300"></div>
            <div>
              <strong>Experiences:</strong>
              <p className="mt-1 text-gray-600">
                {candidate.experiences || 'No Experience information available.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
