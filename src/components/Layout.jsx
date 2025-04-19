import React from 'react';
export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-treviantBlue text-white p-4 space-y-4">
        <img src="/logo.png" alt="Treviant Logo" className="h-12 mx-auto mb-6" />
        <nav className="space-y-2">
          <a href="/ship" className="block hover:underline">Shipping</a>
          <a href="/history" className="block hover:underline">History</a>
          <a href="/settings" className="block hover:underline">Settings</a>
        </nav>
      </aside>
      <main className="flex-1 bg-treviantWhite p-6">{children}</main>
    </div>
  );
}
