import axios from "axios";
import { createContext, useState, useCallback } from "react";
import toast from "react-hot-toast";
export const AdminContext = createContext();
const AdminContextProvider = (props) => {

  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [doctors, setDoctors] = useState([]);
const [appointments,setAppointments] = useState([])
const [dashData,setDashData] = useState(false)




  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = useCallback(async () => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/admin/all-doctors",
      {},
      {
        headers: {
          token: aToken,
        },
      }
    );

    if (data.success) {
      setDoctors(data.doctors);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
}, [aToken, backendUrl]);

const changeAvailability = async (docId) => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/admin/change-availability",
      { docId },
      {
        headers: {
          token: aToken,
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
      getAllDoctors();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};
const getAllAppointments  = async()=>{
  try{
    const { data } = await axios.get(backendUrl + "/api/admin/appointments",{
      headers: {
        token: aToken
      }
    })
    if(data.success){
      setAppointments(data.appointments)
      console.log(data.appointments);
    }else{
      toast.error(data.message)
     }
  }catch(error){
toast.error(error.message)
  }
}
const getDashData = async () => {
  console.log("getDashData called");

  try {
    const { data } = await axios.get(
      backendUrl + "/api/admin/dashboard",
      {
        headers: {
          token: aToken
        }
      }
    );

    console.log("API Response:", data);

    if (data.success) {
      setDashData(data.dashData);
      console.log("Dashboard Data:", data.dashData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log("Dashboard Error:", error);
    toast.error(error.response?.data?.message || error.message);
  }
};


  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    dashData,getDashData

  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;