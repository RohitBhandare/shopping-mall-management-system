import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, User, Users, ShoppingBag, Box, Archive, DollarSign, Heart, UserPlus } from 'react-feather';
import Chatbot from './Chatbot';
import { FaRobot } from 'react-icons/fa';
import Profile from './Profile';

const SidebarLink = ({ to, label, icon: Icon }) => {
  const location = useLocation();

  return (
    <li className="mb-4">
      <Link
        to={to}
        className={`flex items-center text-xl text-gray-300 hover:text-white transition duration-300 ${
          location.pathname === to ? 'bg-gray-600 p-3  font-bold' : ''
        }`}
      >
        {Icon && <Icon className="mr-2" />}
        {label}
      </Link>
    </li>
  );
};

const Dashboard = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Additional logout-related actions can be added here
    logout(); // Call the logout function
  };

  return (
    <div className="flex h-screen">
      <nav className="bg-gray-900 text-white w-full p-4 fixed top-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Menu className="text-2xl cursor-pointer mr-4" onClick={toggleSidebar} />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <div>
            <p className="text-sm text-gray-500">{`IP Address: 192.168.1.1`}</p>
            <p className="text-sm text-gray-500">Logged in as admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:text-white py-2 px-5 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white w-1/6 mt-16 ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="p-4">
          <ul>
            <SidebarLink to="/admin/dashboard/profile" label="Profile" icon={User} />
            <SidebarLink to="/admin/dashboard/users" label="User Details" icon={Users} />
            <SidebarLink to="/admin/dashboard/malls" label="Mall Ledger" icon={ShoppingBag} />
            <SidebarLink to="/admin/dashboard/shops" label="Shop Ledger" icon={Box} />
            <SidebarLink to="/admin/dashboard/items" label="Item Ledger" icon={Archive} />
            <SidebarLink to="/admin/dashboard/orders" label="Order Ledger" icon={DollarSign} />
            <SidebarLink to="/admin/dashboard/customers" label="Customer Ledger" icon={Heart} />
            <SidebarLink to="/admin/dashboard/shop-owners" label="Shop Owner Ledger" icon={UserPlus} />
            <SidebarLink to="/admin/dashboard/mlops" label="ML Ops" icon={FaRobot} />
            {/* ... add more links as needed */}
          </ul>
        </div>
      </aside>

      <main className="p-4 mt-5 w-full overflow-y-auto bg-gray-900">
        <div className="text-xl font-bold text-white mb-4">
          <Outlet />
        </div>

        {/* <div className="flex justify-end">
          <Chatbot />
        </div> */}
      </main>
    </div>
  );
};

export default Dashboard;
