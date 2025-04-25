import React, { useState } from "react";
import InputField from "../components/InputField";
import { useNavigate, Link } from "react-router-dom";
import apiCall from "../../helpers/api";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import ParticlesComponent from "../components/ParticleComponent";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "jobseeker",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiCall.post("auth/register", form, { withCredentials: true });
      Cookies.set("portalUserInfo", JSON.stringify(res?.data?.user), { expires: 1 });
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <ParticlesComponent />
      
      <div className="relative z-10 flex overflow-hidden rounded-xl shadow-2xl w-full max-w-4xl mx-4">
        <div className="hidden md:block w-1/2 bg-blue-600 p-8">
          <div className="h-full flex flex-col justify-center items-center text-white">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Join Jobify</h1>
              <p className="text-xl font-light mb-6">Create your account and start your journey</p>
              <div className="mb-8">
                <img 
                  src="../../src/assets/images/bg-image.jpg" 
                  alt="Registration illustration" 
                  className="mx-auto rounded-lg"
                />
              </div>
              <p className="italic text-blue-100">
                "Thousands of opportunities are waiting for you"
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 bg-gray-900 bg-opacity-90 backdrop-blur-sm p-8">
          <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-white text-center">Create Account</h2>
            <p className="text-gray-400 text-center mb-6">Sign up to get started</p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                <InputField 
                  label="First Name" 
                  name="firstName" 
                  value={form.firstName} 
                  onChange={handleChange} 
                  type="text" 
                  styles={{
                    label: "text-gray-300",
                    input: "bg-gray-800 border-gray-700 text-white rounded-lg py-2 px-2"
                  }}
                />
                <InputField 
                  label="Last Name" 
                  name="lastName" 
                  value={form.lastName} 
                  onChange={handleChange} 
                  type="text" 
                  styles={{
                    label: "text-gray-300",
                    input: "bg-gray-800 border-gray-700 text-white rounded-lg py-2 px-2"
                  }}
                />
              </div>
              
              <InputField 
                label="Email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                type="email" 
                styles={{
                  label: "text-gray-300 mr-2 block",
                  input: "bg-gray-800 border-gray-700 text-white rounded-lg w-full py-2 px-2"
                }}
              />
              
              <InputField 
                label="Password" 
                name="password" 
                value={form.password} 
                onChange={handleChange} 
                type="password" 
                styles={{
                  label: "text-gray-300 mr-2 block",
                  input: "bg-gray-800 border-gray-700 text-white rounded-lg w-full py-2 px-2"
                }}
              />
              
              <div className="mb-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">Role</label>
                <select 
                  name="role" 
                  value={form.role} 
                  onChange={handleChange} 
                  className="w-full bg-gray-800 border border-gray-700 text-white px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2"
                >
                  <option value="jobseeker">JobSeeker</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 w-full text-white font-medium py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none mt-4"
              >
                Create Account
              </button>
            </div>
            
            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition duration-300">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;