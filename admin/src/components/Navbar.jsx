import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { assets } from '../assets/assets';

const Navbar = () => {

  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const logout = () => {
    localStorage.removeItem('aToken');
    localStorage.removeItem('dToken');

    setAToken('');
    setDToken('');
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>

      <div className='flex items-center gap-2 text-xs'>

        <img
          className='w-36 sm:w-40 cursor-pointer'
          src={assets.admin_logo}
          alt="Admin Logo"
        />

        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>

      </div>

      <button
        onClick={logout}
        className='bg-[#5f6fff] text-white text-sm px-10 py-2.5 rounded-full hover:bg-[#4f5ee6] active:scale-95 transition-all duration-200 shadow-sm font-medium'
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;