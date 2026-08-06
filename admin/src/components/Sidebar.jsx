import React,{useContext} from 'react'
import {AdminContext} from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
  return (
    <div className='min-h-screen bg-white border-r'>
     {
        aToken && 
        <ul className='text-[#515151] mt-5'>
<NavLink    className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-5 cursor-pointer border-r-4 ${
               isActive
        ? 'bg-[#F2F3FF] border-[#5F6FFF] text-[#5F6FFF]'
        : 'border-transparent hover:bg-gray-50'
              }`
            } to={'/admin-dashboard'}>
    <img src={assets.home_icon}/>
    <p>Dashboard</p>
</NavLink>
<NavLink    className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-5 cursor-pointer border-r-4 ${
                isActive
        ? 'bg-[#F2F3FF] border-[#5F6FFF] text-[#5F6FFF]'
        : 'border-transparent hover:bg-gray-50'
              }`
            } to={'/all-appointments'}>
    <img src={assets.appointment_icon}/>
    <p>All Appointments</p>
</NavLink>
<NavLink    className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-5 cursor-pointer border-r-4 ${
               isActive
        ? 'bg-[#F2F3FF] border-[#5F6FFF] text-[#5F6FFF]'
        : 'border-transparent hover:bg-gray-50'
              }`
            } to={'/add-doctor'}>
    <img src={assets.add_icon}/>
    <p>Add Doctor</p>
</NavLink>
<NavLink    className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-5 cursor-pointer border-r-4 ${
             isActive
        ? 'bg-[#F2F3FF] border-[#5F6FFF] text-[#5F6FFF]'
        : 'border-transparent hover:bg-gray-50'
              }`
            } to={'/doctor-list'}>
    <img src={assets.people_icon}/>
    <p>Doctor List</p>
</NavLink>



        </ul>
     }
    </div>
  )
}

export default Sidebar