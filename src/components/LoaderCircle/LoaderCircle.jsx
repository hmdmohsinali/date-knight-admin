import React from 'react';

const LoaderCircle = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="w-16 h-16 border-4 border-[#FF965D] border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>
);

export default LoaderCircle;
