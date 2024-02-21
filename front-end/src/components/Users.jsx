import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import userService from '../services/UserService';

const Users = () => {
  const [mallAdmins, setMallAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const admins = await userService.getAllMallAdmins();
        setMallAdmins(admins);
      } catch (error) {
        console.error('Failed to fetch mall admins:', error.message);
        // Handle error scenarios
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredAdmins = mallAdmins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(query.toLowerCase()) ||
        admin.email.toLowerCase().includes(query.toLowerCase()) ||
        admin.username.toLowerCase().includes(query.toLowerCase())
    );
    setMallAdmins(filteredAdmins);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sorted = [...mallAdmins].sort((a, b) =>
      newSortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    setMallAdmins(sorted);
  };

  return (
    <div className="w-full">
      <h2>Users</h2>
      <div className="flex items-center mb-4 mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="px-4 py-2 mr-2 border border-gray-500 text-black"
        />
        <button onClick={handleSort} className="px-4 py-2 bg-gray-700 text-gray-300">
          Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
        </button>
      </div>
      <table className="bg-gray-600 table-auto w-full">
        <thead className="bg-gray-700 text-gray-300">
          <tr>
            <th className="px-4 py-2 text-left border-b border-gray-500">ID</th>
            <th className="px-4 py-2 text-left border-b border-gray-500">Name</th>
            <th className="px-4 py-2 text-left border-b border-gray-500">Email</th>
            <th className="px-4 py-2 text-left border-b border-gray-500">Username</th>
            <th className="px-4 py-2 text-left border-b border-gray-500">Address</th>
            <th className="px-4 py-2 text-left border-b border-gray-500">Phone</th>
            <th className="px-4 py-2 text-left border-b border-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mallAdmins.map((admin) => (
            <tr key={admin.id}>
              <td className="border px-4 py-2 border-gray-500">{admin.id}</td>
              <td className="border px-4 py-2 border-gray-500">{admin.name}</td>
              <td className="border px-4 py-2 border-gray-500">{admin.email}</td>
              <td className="border px-4 py-2 border-gray-500">{admin.username}</td>
              <td className="border px-4 py-2 border-gray-500">{admin.address}</td>
              <td className="border px-4 py-2 border-gray-500">{admin.phone}</td>
              <td className="border px-4 py-2 border-gray-500" style={{ display: 'flex', alignItems: 'center', fontSize: '30px' }}>
                <FaEdit className="text-blue-500 cursor-pointer mr-2" />
                <FaTrash className="text-red-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
