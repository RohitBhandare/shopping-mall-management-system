import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SignupModal from './SignupModal';



const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false); // New state
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Call the login function, assuming it returns true upon successful login
      const loginSuccessful = await login(username, password);
  
      if (loginSuccessful) {
        // If login is successful, navigate to the dashboard
        navigate('/admin/dashboard');
      } else {
        // Handle unsuccessful login (optional)
        alert('Login Failed!!')
        console.error('Login failed');
      }
    } catch (error) {
      // Handle login error (optional)
      console.error('Error during login:', error.message);
    }
  };
  

  const openSignupModal = () => {
    setShowSignupModal(true);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <button
            onClick={openSignupModal} // Open the signup modal on click
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Render the signup modal conditionally based on showSignupModal state */}
      {showSignupModal && (
        <SignupModal onClose={() => setShowSignupModal(false)} />
      )}
    </div>
  );
};

export default Login;
