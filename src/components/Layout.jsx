import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-treviant-lightgray text-treviant-charcoal">
      {/* Top-left logo */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
        <img
          src="/Treviant_Logo_Top_Right.png"
          alt="Treviant Logo"
          className="w-24 h-auto"
        />
        <span className="text-xl font-semibold">Shipping App</span>
      </div>
      {/* Page Content */}
      <div className="pt-24 px-6">{children}</div>
    </div>
  );
}