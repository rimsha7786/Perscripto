import React from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Icons } from 'react-toastify'
const Navbar = () => {
    const navigate = useNavigate();
    const [showmenu,setShowmenu] = useState(false);
    const [token,settoken] = useState(true);
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      
      <img  onClick={() => {
  navigate('/');
 
}}className='w-44 cursor-pointer' src={assets.logo} alt="Logo" />

      <ul className=' md:flex items-start gap-5 font-medium'>

        <NavLink to='/' >
          <li className='py-1'>Home</li>
         <hr className='border-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/doctors'>
          <li className='py-1'>All Doctors</li>
         <hr className='border-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/about'>
          <li className='py-1'>About</li>
      <hr className='border-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/contact'>
          <li className='py-1'>Contact</li>
        <hr className='border-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden' />
        </NavLink>

      </ul>

      <div>
        {token ? (
       <div className="relative group flex items-center gap-3 cursor-pointer">
    <img
        className="w-10 rounded-full"
        src={assets.profile_pic}
        alt=""
    />

    <img
        className="w-5"
        src={assets.dropdown_icon}
        alt=""
    />

    <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-gray-200 ">
        <div className="bg-gray-300 shadow-lg rounded-md p-4 min-w-[180px]">
            <p  onClick={() => navigate('/myprofile')} className="cursor-pointer hover:text-[#5f6fff] ">My Profile</p>
            <p  onClick={() => navigate('/myappoitments')} className="cursor-pointer hover:text-[#5f6fff] ">My Appointments</p>
            <p  onClick={() => settoken(false)} className="cursor-pointer hover:text-red-500 ">Logout</p>
        </div>
    </div>
</div>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className='bg-[#5f6fff] text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            Create account
          </button>
        )}
<img  onClick={()=>setShowmenu(true)}className='w-6 md:hidden'src={assets.menu_icon}/>

<div
  className={`${
    showmenu ? "fixed w-full" : "hidden"
  } md:hidden right-0 top-0 bottom-0 z-20 bg-white transition-all`}
>
  <div className='flex items-center justify-between px-5 py-6'>
    <img className='w-36' src={assets.logo} alt="" />
    <img className='w-7' onClick={()=>setShowmenu(false)}src={assets.cross_icon} alt="" />
  </div>
  <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
    <NavLink  onClick={()=>setShowmenu(false)}to='/'><p>Home</p></NavLink>
      <NavLink  onClick={()=>setShowmenu(false)} to='/doctors'><p>ALL DOCTORS</p></NavLink>
        <NavLink  onClick={()=>setShowmenu(false)} to='/about'><p>ABOUT</p></NavLink>
          <NavLink  onClick={()=>setShowmenu(false)} to='/contact'><p>CONTACT</p></NavLink>
  </ul>
</div>
      </div>
    </div>
  )
}

export default Navbar