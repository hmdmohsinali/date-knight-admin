import React from 'react';

const ViewProfile = ({ isOpen, onClose, candidate }) => {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          &times;
        </button>
        <div className="flex flex-col items-center mb-6">
          {/* Cover Photo */}
          <div className="w-full h-32 border border-orange-400 flex items-center justify-center mb-[-3rem] rounded-t-lg overflow-hidden">
            <img
              src="cover-photo-url.jpg" // Replace with the actual cover photo URL or candidate.coverPhoto
              alt="Cover Photo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Photo */}
          <div className="w-24 h-24 border-4 border-white rounded-full overflow-hidden mb-4 relative z-10">
            <img
              src="profile-photo-url.jpg" // Replace with the actual profile photo URL or candidate.profilePhoto
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
              <strong>Location:</strong> NYC {/* Replace with actual location */}
            </div>
            <div>
              <strong>Contact:</strong> 6363113138 {/* Replace with actual contact */}
            </div>
            <div>
              <strong>Facebook:</strong> janicehan24/facebook {/* Replace with actual Facebook URL */}
            </div>
            <div>
              <strong>Instagram:</strong> janicehan24/instagram {/* Replace with actual Instagram URL */}
            </div>
            <div>
              <strong>Is Contestant?:</strong> {candidate.contestant ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Ban Count:</strong> 5 {/* Replace with actual ban count */}
            </div>
            <div className="col-span-2 mt-4">
              <strong>Comments:</strong>
              <p className="mt-1 text-gray-600">
                Some Text some text some text some text some text some text
              </p>
              <p className="mt-1 text-gray-600">
                Some Text some text some text some text some text some text
              </p>
              <p className="mt-1 text-gray-600">
                Some Text some text some text some text some text some text
              </p>
            </div>
            <div className="col-span-2 mt-4 text-center">
              <strong>June 24, 2023</strong> {/* Replace with actual date */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
