import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const Sidebar = () => {

  const { setisLoggedin, setuserData } = useContext(AppContent)

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setisLoggedin(false);
    toast.success('Logged out successfully!');
    navigate('/');
    setuserData(null)
  };


  const [activeLink, setActiveLink] = useState('dashboard'); // Track active link

  const handleLinkClick = (link) => {
    setActiveLink(link); // Set the active link
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800 flex flex-col justify-between">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                activeLink === 'dashboard' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleLinkClick('dashboard')}
            >
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                activeLink === 'projects' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleLinkClick('projects')}
            >
              <span className="ml-3">Add Projects</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                activeLink === 'users' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleLinkClick('users')}
            >
              <span className="ml-3">Statics</span>
            </a>
          </li>
        </ul>

        {/* Logout button pushed to bottom */}
        <button onClick={logoutHandler} className="bg-red-700 px-6 py-3 rounded-full text-white m-5 mt-auto">Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
