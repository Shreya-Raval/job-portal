import React, { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../services/jobApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data);
    } catch (err) {
      toast.error("Error fetching jobs");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob(id);
      toast.success("Job deleted successfully");
      fetchJobs(); // refresh
    } catch {
      toast.error("Error deleting job");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Jobs</h1>
        <button
          onClick={() => navigate("/recruiter/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Job
        </button>
      </div>

      {jobs.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div key={job._id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-bold">{job.title}</h2>
              <p>{job.company} - {job.location}</p>
              <p className="text-sm text-gray-500 mt-2">{job.description}</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-yellow-500 px-3 py-1 text-white rounded"
                  onClick={() => navigate(`/recruiter/edit/${job._id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 px-3 py-1 text-white rounded"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs created yet.</p>
      )}
    </div>
  );
};

export default RecruiterDashboard;
