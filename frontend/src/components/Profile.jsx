import React, { useContext, useEffect } from 'react';
import { AppContent } from '../context/AppContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Profile = () => {
  const { userData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Back Button */}
      <div className="max-w-md mx-10 my-5 mb-4">
        <button onClick={() => navigate('/dashboard')} className="flex items-center bg-blue-500 text-white px-4 py-3 rounded-full cursor-pointer hover:bg-blue-700 font-medium mb-4"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back to Dashboard
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <img
            src={assets.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full p-3 border-2 border-blue-400 object-cover"
          />
        </div>

        <h2 className="text-2xl font-semibold text-blue-400 mb-2">My Profile</h2>
        <p className="text-gray-500 mb-6">Manage your personal information</p>

        <div className="text-left space-y-4">
          <div>
            <p className="text-gray-600 font-bold">Name</p>
            <p className="text-gray-800 text-md">{userData?.name || 'N/A'}</p>
          </div>

          <div>
            <p className="text-gray-600 font-bold">Email</p>
            <p className="text-gray-800">{userData?.email || 'N/A'}</p>
          </div>

          <div>
            <p className="text-gray-600 font-bold">Country</p>
            <p className="text-gray-800">{userData?.country || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
