import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCall from "../helpers/api";

const Dashboard = () => {
  const [user, setUser] = useState({ firstName: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiCall.get("user/profile");
        setUser(res.data.data);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await apiCall.get("/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-6 border-r">
        <button
          onClick={() => navigate("/profile")}
          className="block w-full text-left text-blue-600 font-semibold mb-4 hover:underline"
        >
           Update Profile
        </button>
        <button
          onClick={handleLogout}
          className="block w-full text-left text-red-600 font-semibold hover:underline"
        >
           Logout
        </button>
      </div>

      {/* Main Dashboard */}
      <div className="flex-1 p-8">
        <div className="bg-blue-100 p-8 rounded-lg shadow text-center mb-6">
          <h1 className="text-3xl font-bold">Hello {user.firstName}!</h1>
          <p className="text-lg text-gray-700 mt-2">Ready to apply for jobs?</p>
        </div>

        {/* Placeholder for job listing */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Job Listings</h2>
          <p className="text-gray-500 italic">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
