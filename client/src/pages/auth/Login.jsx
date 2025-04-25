import React, { useState } from "react";
import InputField from "../components/InputField";
import { useNavigate, Link } from "react-router-dom";
import apiCall from "../../helpers/api";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import ParticlesComponent from "../components/ParticleComponent";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiCall.post("/auth/login", form, { withCredentials: true });
      Cookies.set("portalUserInfo", JSON.stringify(res?.data?.user), { expires: 7 });
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <ParticlesComponent />
      
      <div className="relative z-10 flex overflow-hidden rounded-xl shadow-2xl w-full max-w-4xl mx-4">
        <div className="hidden md:block w-1/2 bg-blue-600 p-8">
          <div className="h-full flex flex-col justify-center items-center text-white">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Jobify</h1>
              <p className="text-xl font-light mb-6">Your gateway to professional opportunities</p>
              <div className="mb-8">
                <img 
                  src="../../src/assets/images/bg-image.jpg" 
                  alt="Career illustration" 
                  className="mx-auto rounded-lg"
                />
              </div>
              <p className="italic text-blue-100">
                "Connect with top employers and kickstart your career journey"
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 bg-gray-900 bg-opacity-90 backdrop-blur-sm p-8">
          <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">Welcome Back</h2>
            <p className="text-gray-400 text-center mb-8">Sign in to access your account</p>
            
            <div className="space-y-6">
              <InputField 
                label="Email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                type="email" 
                styles={{
                  label: "text-gray-300 mb-2 block",
                  input: "bg-gray-800 border-gray-700 text-white w-full rounded-lg mb-2 py-2 px-2"
                }}
              />
              
              <InputField 
                label="Password" 
                name="password" 
                value={form.password} 
                onChange={handleChange} 
                type="password" 
                styles={{
                  label: "text-gray-300 mb-2 block",
                  input: "bg-gray-800 border-gray-700 text-white w-full rounded-lg mb-2 py-2 px-2"
                }}
              />
              
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 w-full text-white font-medium py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none"
              >
                Sign In
              </button>
            </div>
            
            <p className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition duration-300">
                Create one now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;