import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrashAlt, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helper function to format the date
const formatDate = (date: string | Date) => {
  if (!date) return 'N/A';
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, options);
};

function TableOfUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8082/users/all-users', { withCredentials: true });
        if (!response.data) {
          navigate("/login");
        } else {
          setUsers(response.data);
        }
      } catch (error) {
        toast.error('Failed to load users. Please try again later.');
      }
    };
    
    fetchUsers();
  }, [navigate]);

  // Memoized function to toggle lock state of user
  const toggleLock = useCallback(async (userId: string) => {
    try {
      const response = await axios.put(`http://localhost:8082/users/account-locked/${userId}`, {}, { withCredentials: true });
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, accountNonLocked: !user.accountNonLocked } : user
          )
        );
        toast.success('User lock status toggled successfully!');
      } else {
        toast.error('Failed to toggle lock status. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while toggling lock state.');
    }
  }, []);

  // Handle delete user with error handling
  const deleteUser = async (userId: string) => {
    try {
      const response = await axios.delete(`http://localhost:8082/users?id=${userId}`, { withCredentials: true });
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setShowConfirmDelete(false);
        toast.success('User deleted successfully!');
      } else {
        toast.error('Failed to delete user. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the user.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="min-w-full table-auto bg-white text-gray-900">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
              <th className="px-6 py-3 border-b">Username</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Created At</th>
              <th className="px-6 py-3 border-b">Login At</th>
              <th className="px-6 py-3 border-b">Role</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{formatDate(user.createAt)}</td>
                <td className="px-6 py-4">{formatDate(user.loginAt)}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-blue-500 hover:text-blue-700 mx-2 p-2 rounded-full transition-all transform hover:scale-110"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-yellow-500 hover:text-yellow-700 mx-2 p-2 rounded-full transition-all transform hover:scale-110"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowConfirmDelete(true);
                    }}
                    className="text-red-500 hover:text-red-700 mx-2 p-2 rounded-full transition-all transform hover:scale-110"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => toggleLock(user.id)}
                    className={`p-2 rounded-full transition-all transform hover:scale-110 mx-2 ${user.accountNonLocked ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'}`}
                  >
                    <FaLock className={`${user.accountNonLocked ? 'text-green-500' : 'text-red-500'}`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View User Modal */}
      {selectedUser && showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full transition-all transform scale-105">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">User Details</h2>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Created At:</strong> {formatDate(selectedUser.createAt)}</p>
            <p><strong>Login At:</strong> {formatDate(selectedUser.loginAt)}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirm Delete Popup */}
      {showConfirmDelete && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full transition-all transform scale-105">
            <h2 className="text-xl mb-4 text-gray-700">Are you sure you want to delete this user?</h2>
            <p>{selectedUser.username}</p>
            <div className="mt-4">
              <button
                onClick={() => deleteUser(selectedUser.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-200 mr-4"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default TableOfUsers;
