import React, { useState, useEffect } from 'react';
import ItemService from '../services/ItemService';
import GenerativeAiSearch from './GenerativeAiSearch';

const Items = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const itemsData = await ItemService.getAllItems();
          setItems(itemsData);
          setLoading(false);
        } catch (error) {
          setError('Error fetching data');
          setLoading(false);
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Items</h2>
        <GenerativeAiSearch  />
        <table className="bg-gray-600 table-auto">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="py-2 px-2 border border-b border-gray-500">ID</th>
              <th className="py-2 px-2 border border-b border-gray-500">Name</th>
              <th className="py-2 px-2 border border-b border-gray-500">Manufacturing Locale</th>
              <th className="py-2 px-2 border border-b border-gray-500">Price</th>
              <th className="py-2 px-2 border border-b border-gray-500">Expiry Locale</th>
              <th className="py-2 px-2 border border-b border-gray-500">Category</th>
              <th className="py-2 px-2 border border-b border-gray-500">Brand</th>
              <th className="py-2 px-2 border border-b border-gray-500">Description</th>
              <th className="py-2 px-2 border border-b border-gray-500">Manufacturing Date</th>
              <th className="py-2 px-2 border border-b border-gray-500">Expiry Date</th>
              <th className="py-2 px-2 border border-b border-gray-500">Quantity In Stock</th>
              <th className="py-2 px-2 border border-b border-gray-500">Is Available</th>
              
              {/* Add more headers based on your fields */}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="13" className="text-center py-4">Loading...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="13" className="text-center text-red-500 py-4">{error}</td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="bg-gray-800 text-gray-300">
                <td className="py-2 px-2 border border-b border-gray-500">{item.id}</td>
                <td className="py-2 px-2 border border-b border-gray-500">{item.name}</td>
                <td className="py-2 px-2 border border-b border-gray-500">{item.manufacturingLocale}</td>
                <td className="py-2 px-2 border border-b border-gray-500">${item.price.toFixed(2)}</td>
                <td className="py-2 px-2 border border-b border-gray-500">{item.expiryLocale}</td>
                <td className="py-2 px-2 border border-b border-gray-500">{item.category}</td>
                <td className="py-2 px-2 border border-b border-gray-500">{item.brand}</td>
                <td className="py-2 px-2 border border-b border-gray-500">{item.description}</td>
                <td className="py-2 px-2 border border-b border-gray-500">{item.manufacturingDate}</td>
                <td className="py-2 px-2 border border-b border-gray-500">{item.expiryDate}</td>
                <td className="py-2 px-2 border border-b border-gray-500">{item.quantityInStock}</td>
                <td className="py-2 px-2 border border-b border-gray-500">{item.isAvailable ? 'Yes' : 'No'}</td>
                {/* Add more cells based on your fields */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Items;