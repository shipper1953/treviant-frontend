// src/features/user/UserSettings.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../utils/api';

export default function UserSettings() {
  const userEmail = useSelector((state) => state.user.email);
  const userState = useSelector((state) => state.user);
  const [form, setForm] = useState({
    company: '',
    name: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
  });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (userEmail) {
      setForm({
        company: userState.company,
        name: userState.name,
        street1: userState.street1,
        street2: userState.street2,
        city: userState.city,
        state: userState.state,
        zip: userState.zip,
        phone: userState.phone,
        email: userState.default_email,
      });
    }
  }, [userEmail, userState]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setStatus('saving');
      await api.post('/api/user-settings', {
        email: userEmail,
        defaults: form,
      });
      setStatus('saved');
    } catch (error) {
      console.error('Failed to save user settings:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="text-xl font-bold mb-4">User Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="px-4 py-2 border rounded"
          />
        ))}
      </div>
      <button
        onClick={handleSave}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Settings
      </button>

      {status === 'saving' && <p className="mt-2 text-sm">Saving...</p>}
      {status === 'saved' && <p className="mt-2 text-green-600 text-sm">Settings saved!</p>}
      {status === 'error' && <p className="mt-2 text-red-600 text-sm">Error saving settings.</p>}
    </div>
  );
}