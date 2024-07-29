import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
// import img from '../../assets/img.png'

const ProfilePopup = ({ children,img, closePopup }) => {

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='max-w-[70%] md:max-w-[50%] w-[100%] max-h-[90%] h-[100%] bg-white rounded-md p-2 md:p-4 relative '>
        <button
          className='absolute top-4 right-4 text-gray-600 font-bold text-2xl'
          onClick={closePopup}
        >
          <IoCloseSharp />
        </button>

        {/* Profile Picture*/}
        <div className='absolute left-[30%] border-[#FFA786] border-2 w-[130px] h-[80px] sm:w-[150px] sm:h-[80px]  md:w-[200px] md:h-[60px] lg:w-[320px] lg:h-[130px] mr-6'>
          <div className='border-[#FFA786] border-2 w-[60px] sm:w-[80px] md:w-[60px] sm:mr-8 lg:w-[100px] z-10 bg-white h-[60px] sm:h-[70px]  md:h-[60px] lg:h-[100px] rounded-full absolute top-[50%] left-[8%] overflow-hidden'>
            <img src={img} alt="img" className='w-full h-full object-cover' />
          </div>
        </div>
        {/* Individuals-info */}
        <div className='max-w-[80%] w-[100%] left-[20%] h-[60%] grid grid-cols-1 md:grid-cols-2 absolute top-[35%] p-4 overflow-x-scroll md:overflow-hidden'>
          {/* Left Div */}

          
            {
              children
            }

          </div>

          {/* <div className='mb-4 sm:mb-0'>
            <div>Name:</div>
            <div>{profile.name}</div>
            <br />
            <div>Location:</div>
            <div>
              {profile.location}
            </div>
            <br />
            <div>Facebook:</div>
            <div>{profile.facebook}</div>
          </div> */}

          {/* Right Div */}

          {/* <div>
            <div>Email:</div>
            <div>example@email.com</div>
            <br />
            <div>Location:</div>
            <div>NYC</div>
            <br />
            <div>Facebook:</div>
            <div>john.doe@example.com</div>
          </div> */}

        </div>
      </div>
    
  );
};

export default ProfilePopup;
