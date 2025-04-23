import React, { useState } from "react";
import InputField from "../components/InputField";
import { useNavigate,Link } from "react-router-dom";
import apiCall from "../../helpers/api";
import { toast } from "react-toastify";

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
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      //console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
      console.log(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <InputField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} type="text" />
        <InputField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} type="text" />
        <InputField label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
        <InputField label="Password" name="password" value={form.password} onChange={handleChange} type="password" />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
          <select name="role" value={form.role} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="jobseeker">JobSeeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none">
          Register
        </button>
        <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Login
            </Link>
          </p>
      </form>
    </div>
  );
};

export default Register;