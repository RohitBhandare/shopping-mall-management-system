import API_BASE_URL from "./Config";

const CustomerService = {
    getAllCustomers: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/customers`);

            if (response.ok) {
                const customers = await response.json();
                return customers;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch customers');
            }
        } catch (error) {
            throw error;
        }
    },
};

export default CustomerService;