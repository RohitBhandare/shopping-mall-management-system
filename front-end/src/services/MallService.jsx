// MallService.js

import API_BASE_URL from './Config'; 

const MallService = {
  getAllMalls: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/malls`);
      
      if (response.ok) {
        const malls = await response.json();
        return malls;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch malls');
      }
    } catch (error) {
      throw error;
    }
  },

  getAllMallsWithPaginationAndSorting: async ({ page, size, sortBy, sortOrder }) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        size,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`${API_BASE_URL}/api/malls/page?${queryParams}`);
      
      if (response.ok) {
        const malls = await response.json();
        return malls;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch malls with pagination and sorting');
      }
    } catch (error) {
      throw error;
    }
  },

  addMall: async (mallData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/malls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mallData),
      });

      if (response.ok) {
        const addedMall = await response.json();
        return addedMall;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add mall');
      }
    } catch (error) {
      throw error;
    }
  },

  deleteMall: async (mallId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/malls/${mallId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete mall');
      }
    } catch (error) {
      throw error;
    }
  },


  updateMall: async (mallId, updatedMallData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/malls/${mallId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMallData),
      });

      if (response.ok) {
        const updatedMall = await response.json();
        return updatedMall;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update mall');
      }
    } catch (error) {
      throw error;
    }
  },
};

export default MallService;
