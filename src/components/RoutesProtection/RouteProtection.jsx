import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RoutesProtection = () => {
  
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default RoutesProtection;
