import { useEffect, useState } from "react";
import { createJob, getJobById, updateJob } from "../services/jobApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { enumText } from "../helpers/common";

const JobForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingJob, setLoadingJob] = useState(isEditing);

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
      setLoadingJob(true);
      const res = await getJobById(id);
      setForm(res.data.data.jobDetail);
    } catch (err) {
      toast.error("Failed to load job details");
    } finally {
      setLoadingJob(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isEditing) {
        await updateJob(id, form);
        toast.success("Job updated successfully");
      } else {
        await createJob(form);
        toast.success("Job created successfully");
      }
      navigate("/dashboard");
    } catch (err) {
      toast.error(isEditing ? "Failed to update job" : "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing) fetchJob();
  }, [id]);

  if (loadingJob) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{isEditing ? "Edit" : "Create"} Job Listing</h2>
        <p className="text-gray-400">{isEditing ? "Update your job posting information" : "Post a new job opportunity"}</p>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Job Title*</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Senior React Developer"
                value={form.title}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Company*</label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Tech Solutions Inc."
                value={form.company}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Location*</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Remote, New York, NY"
                value={form.location}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Salary Range</label>
              <input
                type="text"
                name="salary"
                placeholder="e.g. $80,000 - $100,000"
                value={form.salary}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Experience Required</label>
              <input
                type="text"
                name="experience"
                placeholder="e.g. 3-5 years"
                value={form.experience}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Job Description</label>
              <textarea
                name="description"
                placeholder="Describe the job responsibilities, requirements, benefits, etc."
                value={form.description}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              ></textarea>
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                isEditing ? "Update Job" : "Create Job"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;