import API_BASE_URL from "./Config";

const userService = {
  createUser: async (user) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/malladmins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const createdUser = await response.json();
        return createdUser;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }
    } catch (error) {
      throw error;
    }
  },

  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/malladmins/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        return userData;
      } else if (response.status === 404) {
        // User not found
        return null;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error) {
      throw error;
    }
  },

  getAllMallAdmins: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/malladmins`);
      
      if (response.ok) {
        const mallAdmins = await response.json();
        return mallAdmins;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch mall admins');
      }
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
