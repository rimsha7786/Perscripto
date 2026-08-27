import { AppContext } from "./AppContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AppContextProvider = ({ children }) => {

  const currencySymbol = "PKR ";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);   // ← empty array, mock data hata di
  const [token, setToken] = useState(
    localStorage.getItem("token")
      ? localStorage.getItem("token")
      : false
  );
const [userData, setUserData] = useState(false)
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/doctor/list");

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const loadUserProfileData = async ()=>{
try {
const {data} = await axios.get(
  backendUrl + '/api/user/get-profile',
  {headers:{atoken: token}}
)
if(data.success){
  setUserData(data.userData)
} else{
  toast.error(data.message)
}


}
catch (error){
  console.log(error)
  toast.error(error.message)
}

  }

  const value = {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,setUserData,
    loadUserProfileData
  };

  useEffect(() => {
    getDoctorsData();
  }, []);
   useEffect(() => {
  if(token){
    loadUserProfileData()
  }else{
    setUserData(false)
  }
  }, [token]);
  


  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;