import React, { useState } from 'react';
import userService from '../services/UserService';

const SignupModal = ({ onClose }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    address: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSignUp = async () => {
    try {
      const createdUser = await userService.createUser(newUser);
      console.log('User signed up:', createdUser);
      // You can perform additional actions after a successful signup
      onClose(); // Close the modal
    } catch (error) {
      console.error('Failed to sign up:', error.message);
      // Handle error scenarios
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96 z-10">
        <h2 className="text-3xl font-bold mb-4 text-center">Sign Up</h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="address"
            value={newUser.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            name="role"
            value={newUser.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
