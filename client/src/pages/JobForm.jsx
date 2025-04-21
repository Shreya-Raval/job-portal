import React, { useEffect, useState } from "react";
import { createJob, getJobById, updateJob } from "../services/jobApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const JobForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    experience: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchJob = async () => {
    try {
      const res = await getJobById(id);
      setForm(res.data.data.jobDetail);
    } catch {
      toast.error("Failed to load job");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateJob(id, form);
        toast.success("Job updated successfully");
      } else {
        await createJob(form);
        toast.success("Job created successfully");
      }
      navigate("/recruiter/dashboard");
    } catch {
      toast.error("Failed to submit job");
    }
  };

  useEffect(() => {
    if (isEditing) fetchJob();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit" : "Create"} Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "company", "location", "salary", "experience", "description"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        ))}
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          {isEditing ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
