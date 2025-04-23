import { useEffect, useState } from 'react';
import apiCall from '../../helpers/api';
import { toast } from 'react-toastify';
import { confirmDelete } from '../../helpers/common';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await apiCall.get('/user/get-all-users', { withCredentials: true });
      setUsers(res.data.users);
    } catch (err) {
      toast.error('Failed to fetch users');
    }
  };

  const handleDelete = async (userId) => {
    const isConfirmed = await confirmDelete();
    if(isConfirmed){

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
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Sr No.</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u._id}>
              <td className="p-2 border text-center">{i + 1}</td>
              <td className="p-2 border">{`${u.firstName} ${u.lastName}`}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border capitalize">{u.role}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleDelete(u._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-3 text-gray-600">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;