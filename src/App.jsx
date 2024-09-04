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
import AcceptInvitation from "./components/AcceptInvite/AcceptInvitation";

const App = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  const handleProfileClick = (content) => {
    setPopupContent(content);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <div className={`flex h-screen ${isPopupVisible ? "blur-sm" : ""}`}>
        <div className="max-w-[100%] w-[1050px] flex-auto scrollable-container">
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/accept-invitation" element={<AcceptInvitation/>}/>
            {/* <Route element={<RoutesProtection />}> */}
              <Route element={<Body />}>
                <Route path="/" element={<VisitorApproval />} />
                <Route path="invite-candidate" element={<InviteCandidate />} />
                <Route path="manage-event" element={<ManageEvent />} />
                <Route path="manage-winner" element={<ManageWinner />} />
              </Route>
            {/* </Route> */}
          </Routes>
        </div>
      </div>

      {isPopupVisible && (
        <ProfilePopup closePopup={closePopup}>{popupContent}</ProfilePopup>
      )}
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
