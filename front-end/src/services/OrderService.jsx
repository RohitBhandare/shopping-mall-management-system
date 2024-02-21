import API_BASE_URL from "./Config";

const OrderService = {
    getOrderDetails: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/orders`);
        
        if (response.ok) {
          const orderDetails = await response.json();
          return orderDetails;
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch order details');
        }
      } catch (error) {
        throw error;
      }
    },
  };
  
  export default OrderService;