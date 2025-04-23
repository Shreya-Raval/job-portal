import React, { useEffect, useState } from "react";
import apiCall from "../helpers/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Profile = () => {
  const [profile, setProfile] = useState({ firstName: "", lastName: "" });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiCall.get("/user/profile");
        setProfile({firstName: res?.data?.data?.firstName, lastName: res?.data?.data?.lastName})
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
      toast.error("Error occured while profile update")
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Profile</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 ml-2 rounded hover:bg-gray-600"
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default Profile;