// src/components/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddressForm from '@/pages/AddressForm';
import Dashboard from '@/pages/Dashboard';
import AdminLogin from '@/pages/AdminLogin';
import UserLogin from '@/features/user/UserLogin';
import ShippingLabelApp from '@/features/shipping/ShippingLabelApp';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/address-form" element={<AddressForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/shipping" element={<ShippingLabelApp />} />
      </Routes>
    </Router>
  );
}