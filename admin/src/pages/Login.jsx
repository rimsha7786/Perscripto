import React, { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          backendUrl + "/api/admin/login",
          {
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        }
        else{
          toast.error(data.message)
        }
      } else {
        console.log("Doctor login");
      }

    } catch (error) {
      console.log(error);
    }
  };

  //login

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8ff]">
      <form
        onSubmit={onSubmit}
        className="bg-white w-[380px] rounded-lg shadow-lg p-8"
      >
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          <span className="text-indigo-600">{state}</span> Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Email
          </label>

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Password
          </label>

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-indigo-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
        >
          Login
        </button>

        {/* Toggle Login Type */}
        {state === "Admin" ? (
          <p className="text-center mt-4 text-sm">
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-indigo-600 cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center mt-4 text-sm">
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-indigo-600 cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;