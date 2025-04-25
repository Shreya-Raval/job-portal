import { useEffect, useState } from 'react';
import apiCall from '../../helpers/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopNav from './TopNav';

const RecruiterApplications = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        let res;
        if (!id) {
          res = await apiCall.get('/application/job-applications');
          setJobTitle('All Jobs');
        } else {
          res = await apiCall.get(`/application/job-applications/${id}`);
          if (res?.data?.data?.applications?.length > 0) {
            setJobTitle(res.data.data.applications[0].job_id?.title || 'Job');
          }
        }
        setApplications(res?.data?.data?.applications || []);
      } catch (err) {
        console.error('Error fetching applications', err);
        toast.error('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [id]);

  const handleStatusChange = async (applicationId, status, applicantName) => {
    try {
      await apiCall.patch(`/application/${applicationId}/updateStatus`, { status });
      setApplications(prev =>
        prev.map(app => (app._id === applicationId ? { ...app, status } : app))
      );
      toast.success(`Application ${status === 'approved' ? 'approved' : 'rejected'} for ${applicantName}`);
    } catch (err) {
      console.error(`Failed to update status to ${status}`, err);
      toast.error('Failed to update application status');
    }
  };

  return (
    <>
    <TopNav/>
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Applications for {jobTitle}</h1>
        <p className="text-gray-400">Review and manage candidate applications</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center border border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-xl font-medium text-gray-400">No applications found</p>
          <p className="text-gray-500 mt-2">Check back later for new applications</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="p-4 font-semibold text-gray-300 border-b border-gray-700">Applicant</th>
                <th className="p-4 font-semibold text-gray-300 border-b border-gray-700">Job Title</th>
                <th className="p-4 font-semibold text-gray-300 border-b border-gray-700">Applied On</th>
                <th className="p-4 font-semibold text-gray-300 border-b border-gray-700">Resume</th>
                <th className="p-4 font-semibold text-gray-300 border-b border-gray-700">Status</th>
                <th className="p-4 font-semibold text-gray-300 border-b border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-4">
                    {app.applicant_id?.firstName} {app.applicant_id?.lastName || ''}
                  </td>
                  <td className="p-4">{app.job_id?.title || 'N/A'}</td>
                  <td className="p-4">
                    {new Date(app.applied_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="p-4">
                    <a
                      href={`http://localhost:8000/${app.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <span>View Resume</span>
                    </a>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize
                      ${app.status === 'approved' ? 'bg-green-900 text-green-200' : 
                        app.status === 'rejected' ? 'bg-red-900 text-red-200' : 
                        'bg-yellow-900 text-yellow-200'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {app.status === 'pending' ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(app._id, 'approved', app.applicant_id?.firstName)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors duration-200 flex items-center space-x-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleStatusChange(app._id, 'rejected', app.applicant_id?.firstName)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors duration-200 flex items-center space-x-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm">Application {app.status}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default RecruiterApplications;