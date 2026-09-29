import React from 'react'
import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import {assets} from '../../assets/assets'

const Dashboard = () => {

  const { aToken, dashData, getDashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  console.log("dashData:", dashData);

  return dashData && (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl'>

        <div className='flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-w-[240px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 select-none'>
          <img className='w-14 h-14 object-contain bg-blue-50 p-2 rounded-lg' src={assets.doctor_icon}/>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.doctors}</p>
            <p className='text-sm text-gray-500 font-medium'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-w-[240px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 select-none'>
          <img className='w-14 h-14 object-contain bg-blue-50 p-2 rounded-lg' src={assets.appointments_icon}/>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.appointments}</p>
            <p className='text-sm text-gray-500 font-medium'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-w-[240px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 select-none'>
          <img className='w-14 h-14 object-contain bg-blue-50 p-2 rounded-lg' src={assets.patients_icon}/>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.patients}</p>
            <p className='text-sm text-gray-500 font-medium'>Patients</p>
          </div>
        </div>

      </div>
<div>
  <div>
  <div className="flex items-center gap-2.5 px-6 py-4 bg-white border border-gray-100 rounded-t-lg mt-8 max-w-5xl">
  <img className="w-5 h-5 object-contain" src={assets.list_icon} alt="List" />
  <p className="font-semibold text-gray-800 text-base">Latest Bookings</p>
</div>
<div className='border border-t-0 border-gray-100 bg-white rounded-b-lg max-w-5xl divide-y divide-gray-100'>
  {
    dashData.latestAppointments.map((item, index) => (
      <div key={index} className='flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors duration-200'>
        {/* Doctor Image */}
        <img className='w-10 h-10 rounded-full object-cover bg-gray-50' src={item.docData.image} alt="" />
        
        {/* Appointment Text Details */}
        <div className='flex-1'>
          <p className='text-sm font-semibold text-gray-800'>{item.docData.name}</p>
          <p className='text-xs font-medium text-gray-400 mt-0.5'>{item.slotDate}</p>
        </div>
      </div>
    ))
  }
</div>

  </div>
</div>


    </div>
  )
}

export default Dashboard
