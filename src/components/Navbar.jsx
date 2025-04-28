import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-treviant-charcoal text-white p-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">Treviant Admin</h1>
      <ul className="flex space-x-4">
        <li>
          <Link to="/admin/users" className="hover:text-treviant-mediumgray">Users</Link>
        </li>
        <li>
          <Link to="/ship" className="hover:text-treviant-mediumgray">Shipping</Link>
        </li>
        <li>
          <Link to="/" className="text-red-400 hover:text-red-600">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
