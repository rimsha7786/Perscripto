import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter,setShowFilter]= useState(false)
  const { doctors } = useContext(AppContext);

  const applyfilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter((doc) => doc.speciality === speciality)
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyfilter();
  }, [doctors, speciality]);

 


  return (
    <div>
      <p className='text-gray-600' >Browse through the doctor specialists.</p>
   <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
  <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
  showFilter ? "bg-primary text-white" : ""
}`}
  onClick={()=>setShowFilter(prev => !prev)}
  >Filters</button>
  
  
  <div   className={`flex flex-col gap-4 text-sm text-gray-600 ${
    showFilter ? "flex" : "hidden sm:flex"
  }`}>
    <p onClick={() =>
  speciality === ""
    ? navigate("/doctors")
    : navigate("/doctors/General physician")
}  className={`w-[94vw] sm:w-auto px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-50 hover:text-black transition-all ${
    speciality === "" ? "bg-indigo-100 text-black" : ""
  }`}
>
      General Physician
    </p>

    <p onClick={() =>
  speciality === ""
    ? navigate("/doctors")
    : navigate("/doctors/Gynecologist")
}
      className={`w-[94vw] sm:w-auto px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-50 hover:text-black transition-all ${
    speciality === "" ? "bg-indigo-100 text-black" : ""
  }`}
>
      Gynecologist
    </p>

    <p  onClick={() =>
  speciality === ""
    ? navigate("/doctors")
    : navigate("/doctors/Dermatologist")
}
      className={`w-[94vw] sm:w-auto px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-50 hover:text-black transition-all ${
    speciality === "" ? "bg-indigo-100 text-black" : ""
  }`}
>
      Dermatologist
    </p>

    <p onClick={() =>
  speciality === ""
    ? navigate("/doctors")
    : navigate("/doctors/Pediatricians")
}
     className={`w-[94vw] sm:w-auto px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-50 hover:text-black transition-all ${
    speciality === "" ? "bg-indigo-100 text-black" : ""
  }`}
>
      Pediatricians
    </p>

    <p onClick={() =>
  speciality === ""
    ? navigate("/doctors")
    : navigate("/doctors/Neurologist")
}
      className={`w-[94vw] sm:w-auto px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-50 hover:text-black transition-all ${
    speciality === "" ? "bg-indigo-100 text-black" : ""
  }`}
>
      Neurologist
    </p>

  <p
  onClick={() =>
    speciality === ""
      ? navigate("/doctors")
      : navigate("/doctors/Gastroenterologist")
  }
  className={`w-[94vw] sm:w-auto px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-50 hover:text-black transition-all ${
    speciality === "" ? "bg-indigo-100 text-black" : ""
  }`}
>
  Gastroenterologist
</p>
 
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {
            filterDoc.map((item,index)=>(

    <div onClick={()=>navigate(`/appointments/${item._id}`)} className="border border-blue-100 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-sm" key={index}>

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

    ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors;