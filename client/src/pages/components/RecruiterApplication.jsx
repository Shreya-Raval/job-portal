import { useEffect, useState } from 'react';
import apiCall from '../../helpers/api';

const RecruiterApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await apiCall.get('/application/job-applications');
        setApplications(res?.data?.data?.applications);
      } catch (err) {
        console.error('Error fetching applications', err);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await apiCall.patch(`/application/${id}/updateStatus`, { status });
      setApplications(prev =>
        prev.map(app => (app._id === id ? { ...app, status } : app))
      );
    } catch (err) {
      console.error(`Failed to update status to ${status}`, err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Applications Received</h1>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">Applicant</th>
                <th className="p-3 border">Job Title</th>
                <th className="p-3 border">Resume</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id} className="border-t">
                  <td className="p-3 border">{app.applicant_id?.firstName}</td>
                  <td className="p-3 border">{app.job_id?.title}</td>
                  <td className="p-3 border">
                    <a
                      href={`http://localhost:8000/${app.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="p-3 border capitalize">{app.status}</td>
                  <td className="p-3 border space-x-2">
                    { app.status !== 'pending' ? (<p>Application Viewed</p>) :
                    (
                        <>
                    <button
                        onClick={() => handleStatusChange(app._id, 'approved')}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, 'rejected')}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Reject
                      </button>
                      </>
                    )} 
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecruiterApplications;
