import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="bg-[#5f6fff] rounded-xl px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center">

        {/* Left Side */}
        <div className="w-full md:w-1/2 py-12">
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
            Book Appointment <br />
            With Trusted Doctors
          </h1>

          <div className="flex items-center gap-3 mt-6">
            <img
              src={assets.group_profiles}
              alt=""
              className="w-20"
            />

            <p className="text-white text-sm">
              Simply browse through our extensive list of trusted doctors,
              <br />
              schedule your appointment hassle-free.
            </p>
          </div>

          <a
            href="#speciality"
            className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full mt-8 font-medium hover:scale-105 transition"
          >
            Book Appointment
            <img
              src={assets.arrow_icon}
              alt=""
              className="w-4"
            />
          </a>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src={assets.header_img}
            alt=""
            className="w-full max-w-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default Header;