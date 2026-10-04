import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {

  const { dToken, dashData, setDashData, getDashData, cancelAppointment, completeAppointment, currencySymbol } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* Top Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl'>

        {/* Earnings Card */}
        <div className='flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-w-[240px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 select-none'>
          <img className='w-14 h-14 object-contain bg-blue-50 p-2 rounded-lg' src={assets.earning_icon} alt='' />
          <div>
            <p className='text-2xl font-bold text-gray-800'>{currencySymbol || 'PKR '}{dashData.earnings}</p>
            <p className='text-sm text-gray-500 font-medium'>Earnings</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-w-[240px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 select-none'>
          <img className='w-14 h-14 object-contain bg-blue-50 p-2 rounded-lg' src={assets.appointments_icon} alt='' />
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.appointments}</p>
            <p className='text-sm text-gray-500 font-medium'>Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className='flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-w-[240px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 select-none'>
          <img className='w-14 h-14 object-contain bg-blue-50 p-2 rounded-lg' src={assets.patients_icon} alt='' />
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.patients}</p>
            <p className='text-sm text-gray-500 font-medium'>Patients</p>
          </div>
        </div>

      </div>

      {/* Latest Bookings List */}
      <div>
        <div className="flex items-center gap-2.5 px-6 py-4 bg-white border border-gray-100 rounded-t-lg mt-8 max-w-5xl">
          <img className="w-5 h-5 object-contain" src={assets.list_icon} alt="List" />
          <p className="font-semibold text-gray-800 text-base">Latest Bookings</p>
        </div>

        <div className='border border-t-0 border-gray-100 bg-white rounded-b-lg max-w-5xl divide-y divide-gray-100'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div key={item._id || index} className='flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors duration-200'>
                {/* Patient Image */}
                <img className='w-10 h-10 rounded-full object-cover bg-gray-50' src={item.userData?.image || assets.default_user} alt="" />

                {/* Patient Details */}
                <div className='flex-1'>
                  <p className='text-sm font-semibold text-gray-800'>{item.userData?.name || 'Patient'}</p>
                  <p className='text-xs font-medium text-gray-400 mt-0.5'>{item.slotDate} | {item.slotTime}</p>
                </div>

                {/* Action Buttons / Status */}
                {item.cancelled ? (
                  <p className='text-xs font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full'>Completed</p>
                ) : (
                  <div className='flex items-center gap-2'>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className='w-8 h-8 cursor-pointer p-1 rounded-full hover:bg-red-50 transition-all'
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className='w-8 h-8 cursor-pointer p-1 rounded-full hover:bg-green-50 transition-all'
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </div>
                )}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard