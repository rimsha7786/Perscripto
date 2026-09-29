import React,{useContext} from 'react'
import Login from './pages/Login'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
 import {AdminContext} from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Admin/Dashboard';
import AllApointments from './pages/Admin/AllApointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './context/DoctorContext';

  const App = () => {
const {aToken, setAToken} = useContext(AdminContext)
const {dToken} = useContext(DoctorContext)
  return aToken || dToken?(
<div>
  
  <ToastContainer />
  <Navbar/>
  <div className='flex items-start'>
    <Sidebar/>
          <Routes>
          {/* Admin Protected Page Routes */}
          {aToken && (
            <>
              <Route path ='/' element={<Dashboard/>}/>
              <Route path ='/admin-dashboard' element={<Dashboard/>}/>
              <Route path ='/all-appointments' element={<AllApointments/>}/>
              <Route path ='/add-doctor' element={<AddDoctor/>}/>
              <Route path ='/doctor-list' element={<DoctorList/>}/>
            </>
          )}

          {/* Doctor Protected Page Routes */}
          {dToken && (
            <>
              <Route path ='/' element={<div>Doctor Dashboard View</div>}/>
              <Route path ='/doctor-dashboard' element={<div>Doctor Dashboard View</div>}/>
            </>
          )}
        </Routes>

  </div>
</div>
  ):(
    <>
    <Login/>
  <ToastContainer />
    </>
  )
}

export default App