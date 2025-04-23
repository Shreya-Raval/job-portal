import { useState } from "react";
import apiCall from "../../helpers/api";
import { toast } from "react-toastify";

const ApplyModal = ({ isOpen, onClose, jobId }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload a resume!");
      return;
    }

    const formData = new FormData();
    formData.append("job_id", jobId);
    formData.append("resume", resume);

    try {
      setLoading(true);
      await apiCall.post("/application/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("Application submitted successfully")
      onClose();
    } catch (error) {
      toast.error(`Error occured while submitting application ${error?.response?.data?.message}`)
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 bg-white/0.5 backdrop-blur-xs flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block mb-4"
            required
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Apply"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;