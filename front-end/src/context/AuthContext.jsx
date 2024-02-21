import React, { createContext, useState, useContext } from 'react';
import API_BASE_URL from '../services/Config';
import { Navigate} from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);



  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/malladmins/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      console.log('Response:', response); // Log the entire response for debugging
  
      if (response.ok) {
        const authenticatedAdmin = await response.json();
        setLoggedIn(true);
        alert("Login Successful");
        return true;
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Login Failed')
    }
  };
  

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
