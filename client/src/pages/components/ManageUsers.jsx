import { useEffect, useState } from 'react';
import apiCall from '../../helpers/api';
import { toast } from 'react-toastify';
import { confirmDelete } from '../../helpers/common';
import TopNav from './TopNav';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await apiCall.get('/user/get-all-users', { withCredentials: true });
      setUsers(res.data.users);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId, userName) => {
    const isConfirmed = await confirmDelete(`Are you sure you want to delete ${userName}?`, 'Delete User');
    if (isConfirmed) {
      try {
        await apiCall.delete(`/user/delete/${userId}`, { withCredentials: true });
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
    <TopNav />
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">User Management</h2>
        <p className="text-gray-400">Manage all registered users on the platform</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="p-4 font-semibold text-gray-300 border-b border-gray-700">Sr.no.</th>
                <th className="p-4 font-semibold text-gray-300 border-b border-gray-700">Name</th>
                <th className="p-4 font-semibold text-gray-300 border-b border-gray-700">Email</th>
                <th className="p-4 font-semibold text-gray-300 border-b border-gray-700">Role</th>
                <th className="p-4 font-semibold text-gray-300 border-b border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-4 text-center">{index + 1}</td>
                  <td className="p-4">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize
                      ${user.role === 'admin' ? 'bg-purple-900 text-purple-200' : 
                        user.role === 'recruiter' ? 'bg-blue-900 text-blue-200' : 
                        'bg-green-900 text-green-200'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(user._id, `${user.firstName} ${user.lastName}`)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors duration-200 flex items-center space-x-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-400">
                    No users found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default ManageUsers;