import React,{useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Body from './components/Body/Body';
import VisitorApproval from './components/VisitorApproval/VisitorApproval';
import CandidateApproval from './components/CandidateApproval/CandidateApproval';
import ManageEvent from './components/ManageEvent/ManageEvent';
import ProfilePopup from './components/ProfilePopup/ProfilePopup';
import ManageWinner from './components/ManageWinner/ManageWinner';


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

  const[isOpen,setIsOpen]=useState(false);

  const toggleSideBar=()=>{
    setIsOpen(!isOpen);
  }
  return (
    <>
    
      <div className={`flex  h-screen ${isPopupVisible ? 'blur-sm' : ''}`}>
        <Sidebar toggleSideBar={toggleSideBar} isOpen={isOpen} />
        
        <div className="max-w-[100%] w-[1050px] overflow-auto flex-auto  ">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<VisitorApproval  onProfileClick={handleProfileClick} />} />
              <Route path="candidate-approval" element={<CandidateApproval onProfileClick={handleProfileClick} />} />
              <Route path="manage-event" element={<ManageEvent />} />
              <Route path="manage-winner" element={<ManageWinner />} />
            </Route>
          </Routes>
        </div>
        </div>
      
      {isPopupVisible && (
        <ProfilePopup closePopup={closePopup}>
          {popupContent}
        </ProfilePopup>
      )}
      </>
   
  );
};

export default App;
