import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Myprofile = () => {
  const {
    backendUrl,
    token,
    userData: contextUserData,
    setUserData: setContextUserData,
  } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  const [userData, setUserData] = useState(null);

  // Load data from AppContext
  React.useEffect(() => {
    if (contextUserData) {
      setUserData({
        ...contextUserData,
        address: contextUserData.address || {
          line1: "",
          line2: "",
        },
      });
    }
  }, [contextUserData]);

  const handleSave = async () => {
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", userData.name);

      formData.append("userId", userData._id);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append(
        "address",
        JSON.stringify(userData.address)
      );

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            atoken: token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Profile Updated");

        // Update AppContext
        setContextUserData(userData);

        setIsEdit(false);
      } else {
        toast.error(data.message || "Data Missing");
      }
    } catch (error) {
      console.log("UPDATE ERROR:", error);

      toast.error(
        error.response?.data?.message || error.message
      );
    } finally {
      setSaving(false);
    }
  };

  if (!userData) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">

      {/* Name */}
      <p className="font-medium text-3xl text-neutral-800 mt-4">
        {userData.name}
      </p>

      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* Contact Information */}
      <div>
        <p className="text-neutral-500 underline mt-3">
          CONTACT INFORMATION
        </p>

        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">

          {/* Email */}
          <p className="font-medium">Email id:</p>

          <p className="text-blue-500">
            {userData.email}
          </p>

          {/* Phone */}
          <p className="font-medium">Phone:</p>

          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-blue-400">
              {userData.phone}
            </p>
          )}

          {/* Address */}
          <p className="font-medium">Address:</p>

          {isEdit ? (
            <div>
              <input
                className="bg-gray-50 w-full"
                type="text"
                placeholder="Address line 1"
                value={userData.address?.line1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line1: e.target.value,
                    },
                  }))
                }
              />

              <input
                className="bg-gray-50 w-full mt-1"
                type="text"
                placeholder="Address line 2"
                value={userData.address?.line2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line2: e.target.value,
                    },
                  }))
                }
              />
            </div>
          ) : (
            <p className="bg-gray-50">
              {userData.address?.line1}
              <br />
              {userData.address?.line2}
            </p>
          )}

        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className="text-neutral-500 underline mt-3">
          BASIC INFORMATION
        </p>

        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">

          {/* Gender */}
          <p>Gender:</p>

          {isEdit ? (
            <select
              className="max-w-28 bg-gray-100"
              value={userData.gender || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">
              {userData.gender}
            </p>
          )}

          {/* Birthday */}
          <p className="font-medium">Birthday:</p>

          {isEdit ? (
            <input
              className="max-w-32 bg-gray-100"
              type="date"
              value={userData.dob || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  dob: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-gray-400">
              {userData.dob}
            </p>
          )}

        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10">

        {isEdit ? (
          <div className="flex gap-3">

            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Information"}
            </button>

            <button
              className="border border-gray-400 px-8 py-2 rounded-full"
              onClick={() => {
                setUserData({
                  ...contextUserData,
                  address: contextUserData?.address || {
                    line1: "",
                    line2: "",
                  },
                });

                setIsEdit(false);
              }}
            >
              Cancel
            </button>

          </div>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}

      </div>

    </div>
  );
};

export default Myprofile;