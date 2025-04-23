import { useEffect, useState } from "react";
import apiCall from "../../helpers/api";
import { useNavigate, useOutletContext } from "react-router-dom";
import ApplyModal from "./ApplyModal";
import { confirmDelete } from "../../helpers/common";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [applyJobId, setApplyJobId] = useState(null); 
  const navigate = useNavigate();
  const [isModalOpen,setModalOpen] = useState(false);
  const { user } = useOutletContext(); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await apiCall.get("/job"); 
        setJobs(res.data.jobs);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (id) => {
    setApplyJobId(id);
    setModalOpen(true);
  }

  const handleDelete = async (id) => {
    const isConfirm  = confirmDelete("Are you sure you want to delete this Job?", "Delete Job");
    if(isConfirm){
     try {
        await apiCall.delete(`/job/${id}`);
        setJobs((prev) => prev.filter((job) => job._id !== id));
      } catch (err) {
        console.error("Failed to delete job", err);
      }
    }
  };

  return (
    <>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
   
      {user?.role === "recruiter" && (
        <button
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/job/create")}
        >
          + Create Job
        </button>
      )}

      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 rounded shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600 mb-2">{job.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              Location: {job.location}
            </p>

            <div className="flex gap-2 flex-wrap">
              {user?.role === "admin" && (
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Mark as Spam
                </button>
              )}

              {user?.role === "jobseeker" && (
                <>
                  <button
                    onClick={() => handleApply(job._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Apply
                  </button>
                  <ApplyModal
                  isOpen={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  jobId={applyJobId}
                />
              </>
              )}

              {user?.role === "recruiter" && (
                <>
                  <button
                    onClick={() => navigate(`/job/edit/${job._id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
};

export default JobList;
