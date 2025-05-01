// src/utils/api.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;
if (!baseURL) {
  throw new Error('VITE_BACKEND_URL is not defined in your environment variables.');
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
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
    // Log out user if unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // or /admin/login depending on context
    }
    return Promise.reject(error);
  }
);

export default api;
