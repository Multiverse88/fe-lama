import api from './api'; // Import instance Axios

// Fungsi untuk mendapatkan alamat user
export const fetchAddress = async () => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari local storage
    const response = await api.get('/checkout/address', {
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header
      },
    });
    return response.data; // Mengembalikan data alamat
  } catch (error) {
    console.error('Error fetching address:', error.response ? error.response.data : error.message);
    throw error; // Melempar error jika terjadi masalah
  }
};

// Fungsi untuk mendapatkan item checkout
export const fetchCheckoutItems = async () => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari local storage
    const response = await api.get('/checkout/preview', {
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header
      },
    });
    return response.data; // Mengembalikan data item checkout
  } catch (error) {
    console.error('Error fetching checkout items:', error.response ? error.response.data : error.message);
    throw error; // Melempar error jika terjadi masalah
  }
};

// Fungsi untuk melakukan checkout
export const checkout = async ({ pickupDate, pickupTime, selectedItems }) => {
  console.log("Data yang dikirim ke API:", { pickup_date: pickupDate, pickup_time: pickupTime, selectedItems }); // Debugging log
  try {
    const token = localStorage.getItem("token"); // Ambil token dari local storage
    const response = await api.post(
      "/checkout/checkout",
      {
        pickup_date: pickupDate, // Sesuaikan key dengan API
        pickup_time: pickupTime,
        selectedItems, // Kirim array waste_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Tambahkan token ke header
        },
      }
    );
    return response.data; // Kembalikan response dari server
  } catch (error) {
    console.error("Error during checkout:", error.response ? error.response.data : error.message);
    throw error; // Lempar error jika terjadi masalah
  }
};


