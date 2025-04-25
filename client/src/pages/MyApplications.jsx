import { useEffect, useState } from "react";
import apiCall from "../helpers/api";
import TopNav from "./components/TopNav";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const { data } = await apiCall.get("/application/my-applications", {
        withCredentials: true,
      });
      setApplications(data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <>
    <TopNav/>
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-blue-400">My Applications</h2>

      {loading ? (
        <div className="flex justify-center py-8">
          <p className="text-gray-400">Loading applications...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-300">No applications found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-gray-300 font-medium">Job Title</th>
                <th className="px-4 py-3 text-left text-gray-300 font-medium">Company</th>
                <th className="px-4 py-3 text-left text-gray-300 font-medium">Applied On</th>
                <th className="px-4 py-3 text-left text-gray-300 font-medium">Status</th>
                <th className="px-4 py-3 text-left text-gray-300 font-medium">Resume</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {applications.map((app) => {
                const resumeUrl = `http://localhost:8000/${app.resume}`;
                return (
                  <tr key={app._id} className="border-t border-gray-700 hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-3">{app.job_id?.title}</td>
                    <td className="px-4 py-3">{app.job_id?.company || "-"}</td>
                    <td className="px-4 py-3">
                      {new Date(app.applied_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 capitalize">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                        app.status === 'rejected' ? 'bg-red-900 text-red-300' :
                        app.status === 'accepted' ? 'bg-green-900 text-green-300' :
                        'bg-blue-900 text-blue-300'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                      >
                        View Resume
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default MyApplications;