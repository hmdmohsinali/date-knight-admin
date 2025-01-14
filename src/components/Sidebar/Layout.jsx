// src/components/Layout/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';


const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-auto overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
