import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors } = useContext(AdminContext);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  return (
    <div className="p-5 w-full">

      <h1 className="text-lg font-medium text-gray-800 mb-5">
        All Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

        {doctors.map((item, index) => (

          <div
            key={index}
            onClick={() => setSelectedDoctor(index)}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300
              ${
                selectedDoctor === index
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200 bg-white hover:bg-indigo-50 hover:shadow-md"
              }
            `}
          >

            {/* Doctor Image */}
            <div
              className={`w-full h-[180px] transition-all duration-300
                ${
                  selectedDoctor === index
                    ? "bg-indigo-500"
                    : "bg-indigo-50"
                }
              `}
            >
              <img
                src={
                  item.image?.includes("sample.jpg")
                    ? `/doctors/doc${index + 1}.png`
                    : item.image
                }
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Doctor Details - ALWAYS WHITE */}
            <div className="p-3 bg-white">

              <h2 className="text-sm font-medium text-gray-800">
                {item.name}
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                {item.speciality}
              </p>

              {/* Available */}
              <div className="flex items-center gap-1.5 mt-2">

                <input
                  type="checkbox"
                  checked={item.available}
                  readOnly
                  className="w-3 h-3 accent-blue-500"
                />

                <span className="text-xs text-gray-500">
                  Available
                </span>

              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default DoctorList;