import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from "./components/Body/Body";
import VisitorApproval from "./components/VisitorApproval/VisitorApproval";
import ManageEvent from "./components/ManageEvent/ManageEvent";
import ProfilePopup from "./components/ProfilePopup/ProfilePopup";
import ManageWinner from "./components/ManageWinner/ManageWinner";
import InviteCandidate from "./components/InviteCandidate/InviteCandidate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./components/SignIn/SignIn";
import AcceptInvitation from "./components/AcceptInvite/AcceptInvitation";
import RoutesProtection from './components/RoutesProtection/RouteProtection'
import ScheduledEvents from "./components/ScheduledEvents/ScheduledEvents";

const App = () => {


  return (
    <>
      <div className={`flex h-screen `}>
        <div className="max-w-[100%] w-[1050px] flex-auto scrollable-container">
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/accept-invitation" element={<AcceptInvitation />} />
            <Route element={<RoutesProtection />}>
              <Route element={<Body />}>
                <Route path="/" element={<VisitorApproval />} />
                <Route path="invite-candidate" element={<InviteCandidate />} />

                {/* Pass handleSchedule to ManageEvent */}
                <Route path="manage-event" element={<ManageEvent />} />

                {/* Pass scheduledEvents to ScheduledEvents */}
                <Route path="scheduled-events" element={<ScheduledEvents />} />

                <Route path="manage-winner" element={<ManageWinner />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
};

export default App;
