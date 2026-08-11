import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "./AdminContext";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = "http://localhost:4000";

    const [doctors, setDoctors] = useState([]);

    // Get admin token from AdminContext
    const { aToken } = useContext(AdminContext);

    const getDoctorsData = async () => {
        try {

            const response = await axios.post(
                `${backendUrl}/api/admin/all-doctors`,
                {},
                {
                    headers: {
                        token: aToken
                    }
                }
            );

            console.log("ALL DOCTORS:", response.data);

            if (response.data.success) {
                setDoctors(response.data.doctors);
                console.log(response.data.doctors);
            }

        } catch (error) {
            console.log("DOCTOR ERROR:", error);
        }
    };

    useEffect(() => {
        if (aToken) {
            getDoctorsData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aToken]);

    const value = {
        doctors,
        setDoctors,
        backendUrl
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;