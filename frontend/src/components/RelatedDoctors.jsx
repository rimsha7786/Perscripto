import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({speciality,docId}) => {


const {doctors} = useContext(AppContext)
  const navigate = useNavigate();

const [relDoc,setRelDocs] = useState([])

useEffect(()=>
{
    if(doctors.length > 0 && speciality){
        const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId)
setRelDocs(doctorsData)
    
    
    }
},[doctors,speciality])


//related doctor
  return (
    <div className="flex flex-col items-center gap-2 py-16 text-gray-800">

        <h1 className="text-3xl font-bold">
            Top Doctors to Book
        </h1>

        <p className="text-sm text-gray-600 text-center sm:w-1/3">
            Simply browse through our extensive list of trusted doctors.
        </p>

   <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-5">

    {relDoc.slice(0,5

    ).map((item,index)=>(

   <div
  onClick={() => {
    navigate(`/appointments/${item._id}`);
    scroll(0, 0);
  }}
  className="border border-blue-100 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-sm"
  key={index}
>

        <img 
          className="w-full bg-blue-50"
          src={item.image} 
          alt="" 
        />

       <div className="p-4">

         <div className="flex items-center gap-2">
           <p className="w-2 h-2 rounded-full bg-green-500"></p>
           <p className="text-sm text-green-600">Available</p>
       </div>

       <p className="text-gray-900 font-semibold mt-2">
        {item.name}
       </p>

       <p className="text-sm text-gray-500">
        {item.speciality}
       </p>

       </div>

    </div>

    ))}

   </div>

   <button onClick={() => {
  navigate('/doctors');
  scrollTo(0, 0);
}}className="mt-8 px-10 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all">
    More
   </button>

    </div>
  )
}

export default RelatedDoctors