import React from 'react';

const Home = () => {

  const counts = {
    users: 3,
    malls: 17,
    shops: 10,
    items: 5,
    orders: 30,
    customers: 1500,
    shopOwners: 100
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold mb-4 animate-bounce">Welcome to the Admin Dashboard</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Users count */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">User Details</h2>
            <p className="text-violet-300">Total Users: <span className='text-indigo-500'>{counts.users}</span></p>
          </div>

          {/* Malls count */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">Mall Ledger</h2>
            <p className="text-violet-300">Total Malls: <span className='text-indigo-500'>{counts.malls}</span></p>
          </div>

          {/* Shops count */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">Shop Ledger</h2>
            <p className="text-violet-300">Total Shops: <span className='text-indigo-500'>{counts.shops}</span></p>
          </div>

          {/* Items count */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">Item Ledger</h2>
            <p className="text-violet-300">Total Items: <span className='text-indigo-500'>{counts.items}</span></p>
          </div>

          {/* Orders count */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">Order Ledger</h2>
            <p className="text-violet-300">Total Orders:<span className='text-indigo-500'>{counts.orders}</span></p>
          </div>

          {/* Customers count */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">Customer Ledger</h2>
            <p className="text-violet-300">Total Customers: <span className='text-indigo-500'>{counts.customers}</span></p>
          </div>

          {/* Shop Owners count */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">Shop Owner Ledger</h2>
            <p className="text-violet-300">Total Shop Owners: <span className='text-indigo-500'>{counts.shopOwners}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
