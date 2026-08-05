import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      {/* Top */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* Left */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="logo" />

          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book.
          </p>
        </div>

        {/* Center */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>

          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer hover:text-primary">Home</li>
            <li className="cursor-pointer hover:text-primary">About us</li>
            <li className="cursor-pointer hover:text-primary">Contact us</li>
            <li className="cursor-pointer hover:text-primary">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>

          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+92-3235547658</li>
            <li>prescripto@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />

      {/* Bottom */}
      <div>
        <p className="py-5 text-sm text-center text-gray-500">
          Copyright 2024 © Prescripto - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer