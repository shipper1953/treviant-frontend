// src/components/UserSettings.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const UserSettings = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setStatus('loading');
      try {
        const response = await api.get('/user/me');
        setUser(response.data);
        setStatus('success');
      } catch (err) {
        console.error('Unauthorized or failed to fetch user data:', err);
        localStorage.removeItem('token');
        navigate('/user/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  if (status === 'loading') {
    return <p className="text-center mt-10 text-gray-600">Loading your data...</p>;
  }

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Your Settings</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Company:</strong> {user.company}</p>
        <p><strong>Street:</strong> {user.street1} {user.street2}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>State:</strong> {user.state}</p>
        <p><strong>ZIP:</strong> {user.zip}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </div>
  );
};

export default UserSettings;
