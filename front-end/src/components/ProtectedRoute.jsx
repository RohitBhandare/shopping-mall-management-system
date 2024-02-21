import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const ProtectedRoute = () => {
  const { loggedIn } = useAuth();

 
        if(loggedIn)
        {
            return <Outlet/>;
        }
        else
        {
            return <Navigate to="/" />; 
        }
};

export default ProtectedRoute;
