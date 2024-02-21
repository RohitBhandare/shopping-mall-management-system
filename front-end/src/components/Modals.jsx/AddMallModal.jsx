// MallAddModal.jsx

import React, { useState } from 'react';
import MallService from '../../services/MallService';  // Update the path accordingly

const MallAddModal = ({ isOpen, onClose, onAdd }) => {
  const [newMall, setNewMall] = useState({
    name: '',
    mallAdmin: '',
    mallAdminEmail: '',
    location: '',
    categories: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMall((prevMall) => ({ ...prevMall, [name]: value }));
  };

  const handleAddMall = async () => {
    try {
      // Call your API service to add the new mall
      const addedMall = await MallService.addMall(newMall);

      alert("Mall Added!!")

      // Call the callback function to update the state in the parent component
      onAdd(addedMall);

      // Reset the form and close the modal
      setNewMall({
        name: '',
        mallAdmin: '',
        mallAdminEmail: '',
        location: '',
        categories: '',
      });
      onClose();
    } catch (error) {
      console.error('Failed to add mall:', error.message);
      // Handle error scenarios
    }
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-10 overflow-y-auto`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-black text-white  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {/* Your modal content with input fields for mall details */}
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium ">Add Mall</h3>
                <div className="mt-2">
                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Mall Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newMall.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 bg-gray-600 text-white border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>

                  {/* Mall Admin */}
                  <div className="mb-4">
                    <label className="block  text-sm font-bold mb-2">Mall Admin Name</label>
                    <input
                    required
                      type="text"
                      name="mallAdmin"
                      
                      value={newMall.mallAdmin}
                      onChange={handleChange}
                      className="w-full px-3 py-2 placeholder-gray-300 bg-gray-600 text-white border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>

                  {/* Mall Admin Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Mall Admin Email</label>
                    <input
                      type="email"
                      name="mallAdminEmail"
                      value={newMall.mallAdminEmail}
                      onChange={handleChange}
                      className="w-full px-3 py-2 placeholder-gray-300 bg-gray-600 text-white border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={newMall.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 placeholder-gray-300 bg-gray-600 text-white border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>

                  {/* Categories */}
                  <div className="mb-4">
                    <label className="block  text-sm font-bold mb-2">Categories</label>
                    <input
                      type="text"
                      name="categories"
                      value={newMall.categories}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-600 text-white border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {/* Add Mall Button */}
            <button
              onClick={handleAddMall}
              className="w-full inline-flex justify-center rounded-md bg-gray-600 text-white border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add Mall
            </button>
            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallAddModal;
