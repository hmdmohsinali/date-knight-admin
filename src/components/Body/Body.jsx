import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Body = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex h-screen">
      <Sidebar toggleSideBar={toggleSideBar} isOpen={isOpen} />
      <div className="flex-auto overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
