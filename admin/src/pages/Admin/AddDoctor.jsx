import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import {useState} from 'react'
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const AddDoctor = () => {


const [docImg, setDocImg] = useState(false);

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [experience, setExperience] = useState("1 Year");
const [fees, setFees] = useState("");

const [speciality, setSpeciality] = useState("General Physician");
const [degree, setDegree] = useState("");

const [address1, setAddress1] = useState("");
const [address2, setAddress2] = useState("");

const [about, setAbout] = useState("");


const { backendUrl, aToken } = useContext(AdminContext);

console.log("BACKEND URL:", backendUrl);
console.log("TOKEN EXISTS:", !!aToken);
const onSubmithandler = async (event) => {
  event.preventDefault();

  console.log("ADD DOCTOR FUNCTION CALLED");

  try {
    if (!docImg) {
      return toast.error("Image not selected");
    }

    const formData = new FormData();

   formData.append("image", docImg);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("fees", Number(fees));
    formData.append("speciality", speciality);
    formData.append("degree", degree);

    formData.append(
      "address",
      JSON.stringify({
        line1: address1,
        line2: address2,
      })
    );

    formData.append("about", about);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    console.log("Sending doctor data...");

const { data } = await axios.post(
    backendUrl + "/api/admin/add-doctor",
    formData,
    {
        headers: {
            token: aToken,
        },
    }
);

console.log("SERVER RESPONSE:", data);

if (data.success) {
    toast.success(data.message);
} else {
    toast.error(data.message);
}

  } catch (error) {
    console.log("ERROR:", error);
    console.log("ERROR RESPONSE:", error.response?.data);

    toast.error(
      error.response?.data?.message || error.message
    );
  }
};
  return (
    <form  onSubmit={onSubmithandler}
    className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
      <p className="text-xl font-semibold mb-6">Add Doctor</p>

      {/* Upload Image */}
      <div className="flex items-center gap-4 mb-8">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt=""
            className="w-20 h-20 rounded-full object-cover"
          />
        </label>

        <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />

        <p className="text-gray-500">
          Upload doctor <br />
          picture
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-sm text-gray-600">Doctor Name</p>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-[#F8F9FD] outline-none focus:border-primary"
            />
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-600">Doctor Email</p>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-[#F8F9FD] outline-none focus:border-primary"
            />
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-600">Doctor Password</p>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-[#F8F9FD] outline-none focus:border-primary"
            />
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-600">Experience</p>
            <select 
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-[#F8F9FD] outline-none focus:border-primary">
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4 Years">4 Years</option>
              <option value="5 Years">5 Years</option>
              <option value="6 Years">6 Years</option>
              <option value="7 Years">7 Years</option>
              <option value="8 Years">8 Years</option>
              <option value="9 Years">9 Years</option>
              <option value="10 Years">10 Years</option>
            </select>
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-600">Fees</p>
            <input
              type="number"
              placeholder="Fees"
              required
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-[#F8F9FD] outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-sm text-gray-600">Speciality</p>
            <select 
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-[#F8F9FD] outline-none focus:border-primary">
              <option value="General Physician">General Physician</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Gynecologist">Gynecologist</option>
            </select>
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-600">Education</p>
            <input
              type="text"
              placeholder="Education"
              required
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-[#F8F9FD] outline-none focus:border-primary"
            />
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-600">Address</p>

            <input
              type="text"
              placeholder="Address 1"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="w-full px-3 py-2 mb-3 border border-gray-200 rounded-md bg-[#F8F9FD] outline-none focus:border-primary"
            />

            <input
              type="text"
              placeholder="Address 2"
              required
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md bg-[#F8F9FD] outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
{/* About */}
<div className="mt-6 flex flex-col gap-4">
  <div>
    <p className="mb-1 text-sm text-gray-600">About Doctor</p>

    <textarea
      rows={5}
      placeholder="Write about doctor"
      required
      value={about}
      onChange={(e) => setAbout(e.target.value)}
      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-[#F8F9FD] outline-none resize-none focus:border-primary"
    />
  </div>

  <div>
   <button
  type="submit"
  className="mt-6 px-8 py-3 bg-blue-600 text-white rounded"
>
  Add Doctor
</button>
  </div>
</div>
    </form>
  );
};

export default AddDoctor;