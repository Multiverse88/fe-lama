import api from './api'; // Ensure Axios is configured in `api.js'

// Function to fetch pickup data
export const fetchPickupData = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const response = await api.get('/orders/pickup-data', {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers
      },
    });
    return response.data.data; // Return the pickup data
  } catch (error) {
    console.error('Error fetching pickup data:', error.response ? error.response.data : error.message);
    throw error; // Throw error if something goes wrong
  }
};

// Function to fetch pickup history
export const fetchPickupHistory = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const response = await api.get('/orders/pickup-history', {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers
      },
    });
    return response.data.data; // Return the pickup history data
  } catch (error) {
    console.error('Error fetching pickup history:', error.response ? error.response.data : error.message);
    throw error; // Throw error if something goes wrong
  }
};

export const fetchPickupDetails = async (pickupId) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const response = await api.get(`/orders/pickup-details/${pickupId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers
      },
    });
    return response.data.data; // Return the pickup details
  } catch (error) {
    console.error('Error fetching pickup details:', error.response ? error.response.data : error.message);
    throw error; // Throw error if something goes wrong
  }
};