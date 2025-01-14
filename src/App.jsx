// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar/Sidebar"; // Remove this import
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
import { CandidateProvider } from "./components/InviteCandidate/CandidateContext";
import ManageCandidate from "./components/Sheet/ApprovalSheet";


const App = () => {
  return (
    <>
      <CandidateProvider>
        <div className={`flex h-screen `}>
          {/* Remove Sidebar from here */}
          <div className="max-w-[100%] w-[1050px] flex-auto scrollable-container">
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/accept-invitation" element={<AcceptInvitation />} />
              <Route element={<RoutesProtection />}>
                <Route element={<Body />}>
                  <Route path="/" element={<VisitorApproval />} />
                  <Route path="/invite-candidate" element={<InviteCandidate />} />
                  <Route path="/manage-candidate" element={<ManageCandidate />} /> {/* Add ManageCandidate Route */}
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
      </CandidateProvider>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
};

export default App;
