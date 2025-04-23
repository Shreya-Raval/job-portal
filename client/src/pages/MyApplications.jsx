import { useEffect, useState } from "react";
import apiCall from "../helpers/api";

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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Applications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Job Title</th>
                <th className="px-4 py-2 text-left">Company</th>
                <th className="px-4 py-2 text-left">Applied On</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                  const resumeUrl = `http://localhost:8000/${app.resume}`;
                  return (
                      <tr key={app._id} className="border-t border-gray-200">
                        <td className="px-4 py-2">{app.job_id?.title}</td>
                        <td className="px-4 py-2">{app.job_id?.company || "-"}</td>
                        <td className="px-4 py-2">
                          {new Date(app.applied_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 capitalize">{app.status}</td>
                        <td className="px-4 py-2">
                          <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Resume
                          </a>
                        </td>
                      </tr>
                  )
                }
            )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
