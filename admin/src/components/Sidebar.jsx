import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r'>
      
      {/* 🟢 Admin Links (Only shows when an admin logs in) */}
      {aToken && (
        <ul className='text-[#515151] mt-5'>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-5 cursor-pointer border-r-4 ${isActive ? 'bg-[#F2F3FF] border-[#5F6FFF] text-[#5F6FFF]' : 'border-transparent hover:bg-gray-50'}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-5 cursor-pointer border-r-4 ${isActive ? 'bg-[#F2F3FF] border-[#5F6FFF] text-[#5F6FFF]' : 'border-transparent hover:bg-gray-50'}`} to={'/all-appointments'}>
            <img src={assets.appointment_icon} alt="" />
            <p>All Appointments</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-5 cursor-pointer border-r-4 ${isActive ? 'bg-[#F2F3FF] border-[#5F6FFF] text-[#5F6FFF]' : 'border-transparent hover:bg-gray-50'}`} to={'/add-doctor'}>
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-5 cursor-pointer border-r-4 ${isActive ? 'bg-[#F2F3FF] border-[#5F6FFF] text-[#5F6FFF]' : 'border-transparent hover:bg-gray-50'}`} to={'/doctor-list'}>
            <img src={assets.people_icon} alt="" />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      )}

      {/* 🟢 Doctor Links (Moved OUTSIDE the admin block so it works independently) */}
      {dToken && (
        <ul className='text-[#515151] mt-5'>
          <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF]' : 'border-transparent hover:bg-gray-50'}`}>
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink to={'/doctor-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF]' : 'border-transparent hover:bg-gray-50'}`}>
            <img src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>
          <NavLink to={'/doctor-profile'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF]' : 'border-transparent hover:bg-gray-50'}`}>
            <img src={assets.people_icon} alt="" />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}

    </div>
  )
}

export default Sidebar
