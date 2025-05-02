import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets.js';
import { AppContent } from '../context/AppContext.jsx';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState('Login');
  const navigate = useNavigate();
  const { backendUrl, setisLoggedin, setuserData } = useContext(AppContent);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === 'Sign Up') {
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
          country,
        });

        if (res.data.success) {
          toast.success('Registration complete! Please login.');
          setState('Login');
          setName('');
          setEmail('');
          setPassword('');
          setCountry('');
        } else {
          toast.error(res.data.message || 'Registration failed.');
        }

      } else {
        const res = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });

        console.log('Login response:', res.data);
         

        if (res.data.success) {

          localStorage.setItem('token', res.data.token);
          setisLoggedin(true);
          toast.success('Logged in successfully!');
          navigate('/dashboard');
        } else {
          toast.error(res.data.message || 'Login failed.');
        }
      }
    } 
    catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Something went wrong.');
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-[url("/bg_img.png")] bg-cover bg-center relative'>
      <div className='absolute inset-0 bg-white opacity-50 z-0'></div>

      <div className='relative z-10 flex flex-col items-center gap-2 bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-semibold text-center'>
          {state === 'Sign Up' ? 'Create Account' : 'LOGIN'}
        </h2>
        <p className='text-center text-sm mb-2 text-gray-600'>
          {state === 'Sign Up' ? 'Create Your Account' : 'Login to Your Account'}
        </p>

        <form className='w-full flex flex-col gap-4' onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='flex items-center border rounded-full px-3 py-2 bg-gray-50'>
              <img src={assets.person_icon} alt='person-icon' className='w-5 h-5 ml-1 mr-2' />
              <input type='text' placeholder='Enter Full Name' className='outline-none bg-transparent w-full' required onChange={(e) => setName(e.target.value)} value={name} />
            </div>
          )}

          <div className='flex items-center border rounded-full px-3 py-2 bg-gray-50'>
            <img src={assets.mail_icon} alt='email-icon' className='w-5 h-5 ml-1 mr-2' />
            <input type='email' placeholder='Enter Email Address' className='outline-none bg-transparent w-full' required onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>

          <div className='flex items-center border rounded-full px-3 py-2 bg-gray-50'>
            <img src={assets.lock_icon} alt='lock-icon' className='w-5 h-5 ml-1 mr-2' />
            <input type='password' placeholder='Enter Password' className='outline-none bg-transparent w-full' required onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>

          {state === 'Sign Up' && (
            <div className='flex items-center border rounded-full px-3 py-2 bg-gray-50'>
              <img src={assets.country_img} alt='country-icon' className='w-5 h-5 ml-1 mr-2' />
              <input type='text' placeholder='Enter Country Name' className='outline-none bg-transparent w-full' required onChange={(e) => setCountry(e.target.value)} value={country} />
            </div>
          )}

          <button className='w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium cursor-pointer'>
            {state}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className='text-gray-400 text-center text-xs mt-2'>
            Already Have an Account?{' '}
            <span onClick={() => setState('Login')} className='cursor-pointer text-blue-400'>
              Login Here
            </span>
          </p>
        ) : (
          <p className='text-gray-400 text-center text-xs mt-2'>
            Don't Have an Account?{' '}
            <span onClick={() => setState('Sign Up')} className='cursor-pointer text-blue-400'>
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
