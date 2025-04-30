// src/api/getAllUsers.js
import api from '../utils/api';

export const getAllUsers = async (token) => {
  const response = await api.get('/admin/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
