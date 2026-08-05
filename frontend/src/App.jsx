import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import Myappoitments from './pages/Myappoitments'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'
import Appointments from './pages/Appointments'
const App = () => {
  return (
  <div className='max-w-7xl mx-auto sm:mx-[10%]'>
    <Navbar/>
    
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/doctors' element={<Doctors/>}/>
<Route path='/doctors/:speciality' element={<Doctors/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/myprofile' element={<Myprofile/>}/>
<Route path='/myappoitments' element={<Myappoitments/>}/>
<Route path="/appointments/:docId" element={<Appointments />} />
<Route path='/about' element={<About/>}/>

</Routes>
<Footer/>
  </div>

  )
}

export default App