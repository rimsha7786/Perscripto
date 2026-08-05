import React,{useContext} from 'react'
import {AdminContext} from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
  return (
    <div>
     {
        aToken && 
        <ul>
<NavLink>
    <img src={assets.home_icon}/>
    <p>Dashboard</p>
</NavLink>
<NavLink>
    <img src={assets.appointments_icon}/>
    <p>All Appointments</p>
</NavLink>
<NavLink>
    <img src={assets.add_icon}/>
    <p>Add Doctor</p>
</NavLink>
<NavLink>
    <img src={assets.people_icon}/>
    <p>Doctor List</p>
</NavLink>



        </ul>
     }
    </div>
  )
}

export default Sidebar