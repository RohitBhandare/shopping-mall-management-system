// Shops.js
import React, { useState, useEffect } from 'react';
import ShopService from '../services/ShopService';
import AddShopModal from './Modals.jsx/AddShopModal';
import { FaTrash } from 'react-icons/fa';

const getStatusColor = (status) => {
  switch (status) {
    case 'Open':
      return 'text-green-600';
    case 'Closed':
      return 'text-red-600';
    case 'Active':
      return 'text-green-800';
    default:
      return 'text-gray-600';
  }
};

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setIsLoading(true);
        const shopsData = await ShopService.getAllShops();
        setShops(shopsData || []);
      } catch (error) {
        console.error('Failed to fetch shops:', error.message);
        // Handle error scenarios
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddShop = async (newShop) => {
    setShops((prevShops) => [...prevShops, newShop]);
    setAddModalOpen(false);
  };

  const handleDeleteShop = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure to delete this shop?');
  
      if (confirmDelete) {
        await ShopService.deleteShop(id);
        setShops((prevShops) => prevShops.filter((shop) => shop.id !== id));
        // Reset the selected shop if it's the one being deleted
    
      }
    } catch (error) {
      console.error('Failed to delete shop:', error.message);
      // Handle error scenarios
    }
  };
  

  const handleUpdateShop = async (id, updatedShop) => {
    // Implement the logic to update a shop (e.g., API call)
    console.log('Updating shop with id:', id, 'new data:', updatedShop);
    // Update the state or perform any other actions as needed
    // For example, you can refresh the list of shops
    await fetchShops();
  };

  const fetchShops = async () => {
    try {
      const shopsData = await ShopService.getAllShops();
      setShops(shopsData || []);
    } catch (error) {
      console.error('Failed to fetch shops:', error.message);
      // Handle error scenarios
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 mt-10">Shops Details</h2>
      <button
        onClick={handleOpenAddModal}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Shop
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="relative bg-white shadow-md p-3 rounded-md transition-transform transform hover:scale-105"
          >
            {/* Display shop details, including image if available */}
            {shop.shopImage && (
              <img
                src={`data:image/png;base64,${shop.shopImage}`} // Assuming the image is in PNG format
                alt={`Shop ${shop.name}`}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
            )}
            <p className="text-xl text-gray-900 font-semibold mb-2">
              Shop Name: <span className="text-xl font-bold text-blue-600">{shop.name}</span>
            </p>
            <p className={`text-sm ${getStatusColor(shop.shopStatus)} mb-2`}>
              Status: <span className={getStatusColor(shop.shopStatus)}>{shop.shopStatus}</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">Description: {shop.shopDescription}</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <p className={`text-sm ${getStatusColor(shop.leaseStatus)} mb-2`}>
                Lease: <span className={getStatusColor(shop.leaseStatus)}>{shop.leaseStatus}</span>
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Owner: <span className="text-green-600">{shop.shopOwner}</span></p>
            {/* Add more details as needed */}
            
            <div className="absolute bottom-2 right-2 flex items-center">
              {/* Delete icon */}
              <FaTrash
                className="text-red-500 cursor-pointer mr-2 hover:text-red-800"
                onClick={() => handleDeleteShop(shop.id)}
              />
              {/* Update icon */}
              <button
                onClick={() => {
                  // Show the update modal with the existing shop data
                  // You might need to create another modal for updating shops
                  console.log('Updating shop:', shop);
                }}
                className="text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                &#9998;
              </button>
            </div>
           
          </div>
        ))}
      </div>
      )}

      {/* AddShopModal */}
      <AddShopModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onAddShop={handleAddShop} />
    </div>
  );
};

export default Shops;
