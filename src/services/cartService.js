import api from './api';

// Fungsi untuk menambah item ke keranjang
export const addItemToCart = async (waste_id, quantity) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari local storage
    const response = await api.post(
      '/cart/add',
      { waste_id, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token ke header
        },
      }
    );
    return response.data; // Mengembalikan data dari API
  } catch (error) {
    console.error(
      'Error adding item to cart:',
      error.response ? error.response.data : error.message
    );
    throw error; // Melempar error untuk ditangani di tempat lain
  }
};

// Fungsi untuk mengurangi item di keranjang
export const decreaseItemInCart = async (waste_id, quantity) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari local storage
    const response = await api.post(
      '/cart/decrease',
      { waste_id, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token ke header
        },
      }
    );
    return response.data; // Mengembalikan data dari API
  } catch (error) {
    console.error(
      'Error decreasing item in cart:',
      error.response ? error.response.data : error.message
    );
    throw error; // Melempar error untuk ditangani di tempat lain
  }
};

// Fungsi untuk mengambil semua item di keranjang
export const fetchCartItems = async () => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari local storage
    const response = await api.get('/cart/view', {
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header
      },
    });
    return response.data.items; // Mengembalikan array items dari API
  } catch (error) {
    console.error(
      'Error fetching cart items:',
      error.response ? error.response.data : error.message
    );
    throw error; // Melempar error untuk ditangani di tempat lain
  }
};

// Fungsi untuk menghapus item dari keranjang
export const deleteItemFromCart = async (waste_id) => {
  try {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    const response = await api.delete(`/cart/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { waste_id }, // Kirim data waste_id untuk penghapusan
    });
    return response.data; // Kembalikan data dari API
  } catch (error) {
    console.error("Error deleting item from cart:", error.response?.data || error.message);
    throw error;
  }
};
