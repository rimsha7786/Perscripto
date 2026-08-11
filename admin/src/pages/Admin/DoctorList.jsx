import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";

const DoctorList = () => {

  const { doctors, aToken,getAllDoctors
   } = useContext(AppContext);

   useEffect(()=>{
    if(aToken){
      getAllDoctors()
    }
   })
  return (
    <div>
      <h1>All Doctors</h1>

      {doctors.map((item, index) => (
        <div key={index}>

          <img
            src={item.image}
            alt=''
          />

          <div>
            <p>{item.name}</p>
            <p>{item.speciality}</p>
            <p>{item.degree}</p>
            <p>{item.experience}</p>
            <p>{item.fees}</p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default DoctorList;