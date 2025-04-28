import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second fake loading for visual effect
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <motion.div 
      className="p-10 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Welcome, {user?.email || 'Admin'} 👋</h1>
        <p className="text-lg text-gray-600 mt-2">Manage your shipments, users, and more from here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          className="bg-white shadow-xl p-6 rounded-2xl hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold mb-2">📦 Shipments</h2>
          <p className="text-gray-600">View and manage all shipments.</p>
        </motion.div>

        <motion.div 
          className="bg-white shadow-xl p-6 rounded-2xl hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold mb-2">👤 Users</h2>
          <p className="text-gray-600">Manage admin and client accounts.</p>
        </motion.div>

        <motion.div 
          className="bg-white shadow-xl p-6 rounded-2xl hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold mb-2">⚙️ Settings</h2>
          <p className="text-gray-600">Configure your platform.</p>
        </motion.div>
      </div>

      <div className="text-center mt-10">
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Dashboard;
