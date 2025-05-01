// src/utils/api.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL?.trim();
if (!baseURL || !baseURL.startsWith('http')) {
  throw new Error(
    `Invalid VITE_BACKEND_URL: "${import.meta.env.VITE_BACKEND_URL}". Check your .env file.`
  );
}

const api = axios.create({
  baseURL,
});

// Automatically attach JWT if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Adjust if using admin paths
    }
    return Promise.reject(error);
  }
);

export default api;
