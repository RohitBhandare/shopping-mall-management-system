import API_BASE_URL from "./Config";


const ItemService = {

    getAllItems: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/items`);
          
          if (response.ok) {
            const items = await response.json();
            return items;
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch items');
          }
        } catch (error) {
          throw error;
        }
      },
    

};

export default ItemService;
