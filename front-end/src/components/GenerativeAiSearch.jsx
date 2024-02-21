import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

const GenerativeAiSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Prepare the search query JSON format
      const searchQuery = {
        promt: searchTerm,
        
      };

      // Make a POST request to the API
      const response = await fetch('http://127.0.0.1:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchQuery),
        
      });

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
        
      }

      const result = await response.json();
     
      // Trigger the callback with the search results
      onSearch(result);
      
    } catch (error) {
      console.error('Generative AI search error:', error.message);
      alert('Generative AI search error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-center relative">
      <input
        type="text"
        placeholder="Hey, I'm a generative AI! Ask me a question, and I'll perform SQL queries on the database to find the answer!"
        className="px-4 py-4 text-black rounded-l focus:outline-none focus:border-indigo-900 focus:ring focus:ring-indigo-500 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-10 py-4 rounded-r transition duration-300 hover:bg-blue-700 hover:text-gray-100"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Ask'}
      </button>
      {loading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </form>
  );
};

export default GenerativeAiSearch;
