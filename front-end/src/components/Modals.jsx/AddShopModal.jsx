// AddShopModal.js
import React, { useState } from 'react';

import ShopService from '../../services/ShopService';


const AddShopModal = ({ isOpen, onClose, onAddShop }) => {
    const [newShop, setNewShop] = useState({
      name: '',
      shopCategory: '',
      shopDescription: '',
      shopStatus: 'Open',
      shopOwner: '',
      leaseStatus: 'Active',
      shopImage: null,
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewShop((prevShop) => ({
        ...prevShop,
        [name]: value,
      }));
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setNewShop((prevShop) => ({
        ...prevShop,
        shopImage: file,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Validate the form fields if needed
  
      try {
        // Call the addShop function from the service
        const addedShop = await ShopService.addShop(newShop);

        // Pass the addedShop data to the parent component
        onAddShop(addedShop);
         
    
        setNewShop({
          name: '',
          shopCategory: '',
          shopDescription: '',
          shopStatus: 'Open',
          shopOwner: '',
          leaseStatus: 'Active',
          shopImage: null,
        });
        onClose();
      } catch (error) {
        console.error('Error adding shop:', error.message);
        // Handle error scenarios
      }
    };
  return (
    <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'visible' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
          <div className="bg-gray-800 text-white p-4 flex justify-between">
            <h2 className="text-2xl font-bold">Add New Shop</h2>
            <button onClick={onClose} className="text-lg focus:outline-none">
              &#x2715;
            </button>
          </div>
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              {/* Form fields go here */}
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Shop Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newShop.name}
                onChange={handleChange}
                className="w-full bg-gray-100  text-black border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                required
              />

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopCategory">
                Shop Category
              </label>
              <input
                type="text"
                id="shopCategory"
                name="shopCategory"
                value={newShop.shopCategory}
                onChange={handleChange}
                className="w-full bg-gray-100 text-black border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                required
              />

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopDescription">
                Shop Description
              </label>
              <textarea
                id="shopDescription"
                name="shopDescription"
                value={newShop.shopDescription}
                onChange={handleChange}
                className="w-full bg-gray-100 border text-black border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                required
              />

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopStatus">
                Shop Status
              </label>
              <select
                id="shopStatus"
                name="shopStatus"
                value={newShop.shopStatus}
                onChange={handleChange}
                className="w-full bg-gray-100 border text-black border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                required
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopOwner">
                Shop Owner
              </label>
              <input
                type="text"
                id="shopOwner"
                name="shopOwner"
                value={newShop.shopOwner}
                onChange={handleChange}
                className="w-full text-black bg-gray-100 border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                required
              />

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaseStatus">
                Lease Status
              </label>
              <select
                id="leaseStatus"
                name="leaseStatus"
                value={newShop.leaseStatus}
                onChange={handleChange}
                className="w-full text-black bg-gray-100 border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              {/* Image input */}
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopImage">
                Shop Image
              </label>
              <input
                type="file"
                id="shopImage"
                name="shopImage"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-black bg-gray-100 border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
              />

              <div className="flex items-center justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                >
                  Add Shop
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShopModal;
