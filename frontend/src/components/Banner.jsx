import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
const navigate = useNavigate()

  return (
    <div className='flex bg-primary rounded-lg px-10 sm:px-10 md:px-15 lg:px-9 my-15 md:mx-2'>

      {/* Left Side */}
      <div className='flex-1 py-8 sm:py-7 md:py-14 lg:py-19 lg:pl-5'>

        <div className='text-xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-white'>
          <p>Book Appointment</p>
          <p className='mt-2'>With 100+ Trusted Doctors</p>
        </div>


        <button
onClick={() => {
  navigate('/login');
  scrollTo(0, 0);
}}
 
 className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>
          Create Account
        </button>

      </div>

      {/* Right Side */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img
          className='w-full absolute bottom-0 right-0 max-w-md'
          src={assets.appointment_img}
          alt=""
        />
      </div>

    </div>
  )
}

export default Banner