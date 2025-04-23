import React, { useState } from "react";
import InputField from "../components/InputField";
import { useNavigate,Link } from "react-router-dom";
import apiCall from "../../helpers/api";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

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
      // console.log(res?.data?.user);
      Cookies.set("portalUserInfo",JSON.stringify(res?.data?.user), { expires: 7 });
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <InputField label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
        <InputField label="Password" name="password" value={form.password} onChange={handleChange} type="password" />
        <button type="submit" className="bg-green-500 hover:bg-green-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none">
          Login
        </button>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Create a new account
            </Link>
          </p>
      </form>
    </div>
  );
};

export default Login;
