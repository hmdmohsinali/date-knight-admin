<<<<<<< HEAD
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Body from './components/Body/Body';
import VisitorApproval from './components/VisitorApproval/VisitorApproval';
import ManageEvent from './components/ManageEvent/ManageEvent';
import ManageWinner from './components/ManageWinner/ManageWinner';
import InviteCandidate from './components/InviteCandidate/InviteCandidate';
import Signin from './auth/SingIn';
import ProtectedRoute from './components/ProtectedRoute';
=======
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Body from "./components/Body/Body";
import VisitorApproval from "./components/VisitorApproval/VisitorApproval";
import ManageEvent from "./components/ManageEvent/ManageEvent";
import ProfilePopup from "./components/ProfilePopup/ProfilePopup";
import ManageWinner from "./components/ManageWinner/ManageWinner";
import InviteCandidate from "./components/InviteCandidate/InviteCandidate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./components/SignIn/SignIn";
import RoutesProtection from "./components/RoutesProtection/RouteProtection";
>>>>>>> d3e5f2755927b6ca925ce6d60c00f2b5225f2551

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

<<<<<<< HEAD
  const toggleSideBar = () => {
    setIsOpen(!isOpen);
=======
  const handleProfileClick = (content) => {
    setPopupContent(content);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
>>>>>>> d3e5f2755927b6ca925ce6d60c00f2b5225f2551
  };

  return (
    <>
<<<<<<< HEAD
      <div className={`flex h-screen`}>

        <div className="max-w-[100%] w-[1050px] flex-auto scrollable-container">
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route
              element={
                <ProtectedRoute>
                  <Body />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<VisitorApproval />} />
              <Route path="invite-candidate" element={<InviteCandidate />} />
              <Route path="manage-event" element={<ManageEvent />} />
              <Route path="manage-winner" element={<ManageWinner />} />
=======
      <div className={`flex h-screen ${isPopupVisible ? "blur-sm" : ""}`}>
        <div className="max-w-[100%] w-[1050px] flex-auto scrollable-container">
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />

            <Route element={<RoutesProtection />}>
              <Route element={<Body />}>
                <Route path="/" element={<VisitorApproval />} />
                <Route path="invite-candidate" element={<InviteCandidate />} />
                <Route path="manage-event" element={<ManageEvent />} />
                <Route path="manage-winner" element={<ManageWinner />} />
              </Route>
>>>>>>> d3e5f2755927b6ca925ce6d60c00f2b5225f2551
            </Route>
          </Routes>
        </div>
      </div>
<<<<<<< HEAD
=======

      {isPopupVisible && (
        <ProfilePopup closePopup={closePopup}>{popupContent}</ProfilePopup>
      )}
      <ToastContainer position="top-center" />
>>>>>>> d3e5f2755927b6ca925ce6d60c00f2b5225f2551
    </>
  );
};

export default App;
