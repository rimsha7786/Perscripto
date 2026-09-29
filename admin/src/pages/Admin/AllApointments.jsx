import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'


const AllApointments = () => {
  const { aToken, appointments, getAllAppointments } = useContext(AdminContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);


  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-4 text-lg font-semibold text-gray-800'>
        All Apointments
      </p>

      <div className='bg-white border border-gray-200 rounded'>

        <div className='grid grid-cols-[50px_2fr_1fr_2fr_2fr_1fr_1fr] items-center gap-2 px-4 py-3 bg-gray-50 border-b text-sm text-gray-600'>
          <p>#</p>
          <p>Patient Name</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
         
        </div>

        {appointments.map((item, index) => (
          <div
            key={item._id}
            className='grid grid-cols-[50px_2fr_1fr_2fr_2fr_1fr_1fr] items-center gap-2 px-4 py-3 border-b'
          >

            <p>{index + 1}</p>

            <div className='flex items-center gap-2'>
              <img
                className='w-8 h-8 rounded-full'
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>

            <p>{calculateAge(item.userData.dob)}</p>

            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

           <div className='flex items-center gap-2'>
  <img
    className='w-8 h-8 rounded-full object-cover'
    src={item.docData.image}
    alt={item.docData.name}
  />
  <p>{item.docData.name}</p>
</div>

            <p>PKR {item.amount}</p>
        

          </div>
        ))}

      </div>
    </div>
  )
}

export default AllApointments