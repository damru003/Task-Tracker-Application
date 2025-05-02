import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'


const Navbar = () => {

  const { userData, setisLoggedin } = useContext(AppContent);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token')
    setisLoggedin(false);
    toast.success("Logged Out Successfully!")
    navigate('/')
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex">
            <img src={assets.tracking} className='w-6' />
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white"> TaskTracker</span>
          </div>


          <div className='group relative'>
            <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center font-semibold uppercase cursor-pointer">
              {userData?.name?.charAt(0)}
            </div>

            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 p-5 bg-gray-500 text-white rounded text-end'>

                <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black text-sm'>My Profile</p>

                <p onClick={logoutHandler} className='cursor-pointer hover:text-black text-sm'>Logout</p>
              </div>
            </div>

          </div>



        </div>
      </div>
    </nav>
  );
};

export default Navbar;
