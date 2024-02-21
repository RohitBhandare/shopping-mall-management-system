import API_BASE_URL from './Config';

const ShopService = {
  getAllShops: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/shops`);
      if (!response.ok) {
        throw new Error('Failed to fetch shops');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
      // Handle error scenarios
    }
  },

  addShop: async (newShop) => {
    try {
      const formData = new FormData();
  
      // Append the shop data fields
      formData.append('name', newShop.name);
      formData.append('shopCategory', newShop.shopCategory);
      formData.append('shopDescription', newShop.shopDescription);
      formData.append('shopStatus', newShop.shopStatus);
      formData.append('shopOwner', newShop.shopOwner);
      formData.append('leaseStatus', newShop.leaseStatus);
  
      // Append the shop image
      if (newShop.shopImage) {
        formData.append('file', newShop.shopImage);
      }
  
      const response = await fetch(`${API_BASE_URL}/api/shops`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to add shop');
      }
  
      const addedShop = await response.json();
      console.log(addedShop)
      return addedShop;
    } catch (error) {
      console.error(error.message);
      // Handle error scenarios
    }
  },

  deleteShop: async (shopId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/shops/${shopId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete shop');
      }
    } catch (error) {
      throw error;
    }
  },
  
};

export default ShopService;
