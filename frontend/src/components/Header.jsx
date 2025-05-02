import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800s'>
            <img src={assets.header_img}
                className='w-36 h-36 rounded-full mb-6'
                alt='header-imgs' />
            <h1 className='flex items-center gap-2 text-3xl font-medium mb-2'>
                Welcome to Task Tracker
                <img src={assets.hand_wave} className='w-8 aspect-square' alt='wave' />
            </h1>
            <h2 className='text-2xl md:text-5xl font-semibold mt-2 mb-4'>
                Organize. Track. Achieve. 🚀
            </h2>
            <p className='max-w-md mb-2 mt-2'>
                Stay focused and productive with Task Tracker — your ultimate solution for managing tasks and boosting team efficiency.
            </p>
            <p className='max-w-md mb-8 mt-2'>
                From personal to-dos to collaborative project workflows, we've got you covered. Let’s take control of your tasks today! ✅
            </p>
            <button
                onClick={() => navigate('/login')}
                className='border border-gray-500 rounded-full px-8 py-3 hover:bg-gray-100 hover:scale-105 transform transition duration-200'
            >
                Get Started
            </button>

        </div>
    )
}

export default Header
