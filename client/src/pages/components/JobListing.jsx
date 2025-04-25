import { useEffect, useState } from "react";
import apiCall from "../../helpers/api";
import { useNavigate, useOutletContext } from "react-router-dom";
import ApplyModal from "./ApplyModal";
import { confirmDelete } from "../../helpers/common";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [applyJobId, setApplyJobId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useOutletContext();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await apiCall.get("/job");
        if (res?.data?.data?.jobDetail !== null) {
          setJobs(res?.data?.data?.jobDetail);
        }
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (id) => {
    setApplyJobId(id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    const isConfirm = confirmDelete(
      "Are you sure you want to delete this Job?",
      "Delete Job"
    );
    if (isConfirm) {
      try {
        await apiCall.delete(`/job/${id}`);
        setJobs((prev) => prev.filter((job) => job._id !== id));
      } catch (err) {
        console.error("Failed to delete job", err);
      }
    }
  };

  return (
    <div className="px-2 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Available Jobs</h2>
      
        {user?.role === "recruiter" && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
            onClick={() => navigate("/job/create")}
          >
            + Create Job
          </button>
        )}
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No jobs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="p-5">
                <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                <p className="text-gray-300 mb-3">{job.description}</p>
                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-400">{job.location}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
                    >
                      Mark as Spam
                    </button>
                  )}

                  {user?.role === "jobseeker" && (
                    <>
                      <button
                        onClick={() => handleApply(job._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300"
                      >
                        Apply Now
                      </button>
                    </>
                  )}

                  {user?.role === "recruiter" && (
                    <>
                      <button
                        onClick={() => navigate(`/job/edit/${job._id}`)}
                        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => navigate(`/job-applications/${job._id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                      >
                        View Applications
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {user?.role === "jobseeker" && isModalOpen && (
        <ApplyModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          jobId={applyJobId}
        />
      )}
    </div>
  );
};

export default JobList;