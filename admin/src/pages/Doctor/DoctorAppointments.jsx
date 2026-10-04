
import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, currencySymbol } = useContext(DoctorContext)

  // Helper function to calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return 'N/A'
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return isNaN(age) ? dob : age
  }

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        {/* Table Header (6 Columns) */}
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr] gap-1 py-3 px-6 border-b bg-gray-50 text-gray-600 font-semibold'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
        </div>

        {/* Table Rows (6 Columns) */}
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
              key={item._id || index}
            >
              <p className='max-sm:hidden'>{index + 1}</p>
              
              <div className='flex items-center gap-2'>
                <img
                  className='w-8 h-8 rounded-full object-cover'
                  src={item.userData?.image || assets.default_user}
                  alt=''
                />
                <p className='font-medium text-gray-800'>{item.userData?.name || 'Patient'}</p>
              </div>

              <div>
                <p className='text-xs inline-block border border-primary px-2 py-0.5 rounded-full text-primary font-medium'>
                  {item.payment ? 'Online' : 'CASH'}
                </p>
              </div>

              <p className='max-sm:hidden'>{calculateAge(item.userData?.dob)}</p>

              <p>
                {item.slotDate}, {item.slotTime}
              </p>

              <p>
                {currencySymbol || '$'}{item.amount}
              </p>
            </div>
          ))
        ) : (
          <div className='p-6 text-center text-gray-500'>
            No appointments found.
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorAppointments

