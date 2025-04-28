import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './userSlice';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function UserLogin() {
  const [emailInput, setEmailInput] = useState('');
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const userEmail = useSelector((state) => state.user.email);
  const navigate = useNavigate();

  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = async () => {
    if (!emailInput || !passwordInput) {
      return alert('Please enter both email and password');
    }

  try {
    const response = await api.post('api/auth/login', {
      email: emailInput,
      password: passwordInput,
    });

    // Save JWT token
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('email', emailInput);

    dispatch({
      type: 'user/loginUser/fulfilled',
      payload: {
        email: emailInput,
        status: 'succeeded',
      },
    });

    navigate('/ship');
  } catch (error) {
    console.error('❌ Login failed:', error);
    alert('Invalid email or password');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">Welcome Back</h2>

        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded text-gray-800 placeholder-gray-400"
        />

        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded text-gray-800 placeholder-gray-400"
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 w-full text-white font-semibold py-2 rounded"
        >
          Login
        </button>

        {userStatus === 'loading' && <p className="mt-2 text-sm text-gray-600">Logging in...</p>}
        {userEmail && userStatus === 'succeeded' && (
          <p className="mt-2 text-green-600 text-sm">Logged in as {userEmail}</p>
        )}
      </div>
    </div>
  );
}
