import React, { useEffect, useState } from "react";
import apiCall from "../helpers/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiCall.get("/user/profile");
        setProfile({
          firstName: res?.data?.data?.firstName,
          lastName: res?.data?.data?.lastName
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await apiCall.put("/user/update-profile", profile);

      toast.success("Profile Updated Successfully");
      Cookies.set('portalUserInfo', JSON.stringify(res?.data?.user), {
        expires: 1,
      });
      navigate('/refresh');
      setTimeout(() => navigate('/dashboard'), 0);
    } catch (err) {
      console.log(err);
      toast.error("Error occurred while updating profile");
    }
  };

  return (
  <div className="bg-black w-full min-h-screen">
    <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Update Profile</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-700 text-white py-2 px-6 rounded hover:bg-gray-600 transition duration-200"
            onClick={() => navigate("/dashboard")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  </div>  
  );
};

export default Profile;