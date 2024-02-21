// MallEditModal.js

import React, { useState } from 'react';
import MallService from '../../services/MallService';


const MallEditModal = ({ isOpen, onClose, mall, onUpdate }) => {
  const [editedMall, setEditedMall] = useState({ ...mall });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMall((prevMall) => ({ ...prevMall, [name]: value }));
  };



  const handleSaveChanges = async () => {
    try {
      // Make the API call to update the mall
      const updatedMall = await MallService.updateMall(mall.id, editedMall);

      // Call the onUpdate function to update the mall in the parent component's state
      onUpdate(updatedMall);

      // Close the modal
      onClose();
      
    } catch (error) {
      console.error('Failed to update mall:', error.message);
      // Handle error scenarios
    }
  };

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-black p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-3xl font-bold mb-4 text-center">Edit Mall</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Name:</label>
          <input
            type="text"
            name="name"
            value={editedMall.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-600  focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Admin:</label>
          <input
            type="text"
            name="mallAdmin"
            value={editedMall.mallAdmin}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded  bg-gray-600  focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white text-white">Admin Email:</label>
          <input
            type="text"
            name="mallAdminEmail"
            value={editedMall.mallAdminEmail}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-600  focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white text-white">Location:</label>
          <input
            type="text"
            name="location"
            value={editedMall.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-600  focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white text-white">Categories:</label>
          <input
            type="text"
            name="categories"
            value={editedMall.categories}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-600  focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          onClick={handleSaveChanges}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MallEditModal;
