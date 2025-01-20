import axios from 'axios';

// Membuat instance Axios dengan baseURL untuk lokal
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ganti base URL untuk lingkungan lokal
});

// Menambahkan header x-api-key ke instance
const API_KEY = 'kunci-rahasia-api'; // Ganti dengan nilai API Key yang sesuai
api.defaults.headers.common['x-api-key'] = API_KEY;

// Mengatur interceptor jika diperlukan (opsional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
