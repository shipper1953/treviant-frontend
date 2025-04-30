import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';

// Fetch all users
export function useUsers(token) {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get('/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    enabled: !!token, // Wait until token is available
  });
}

// Create new user
export function useCreateUser(token) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUser) => {
      const { data } = await api.post('/admin/users', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Delete user (optional)
export function useDeleteUser(token) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      await api.delete(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
