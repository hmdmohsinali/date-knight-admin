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

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
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
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
