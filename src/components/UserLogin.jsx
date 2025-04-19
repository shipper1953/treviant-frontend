import React from 'react';
export default function UserLogin() {
  return (
    <div className="flex h-screen items-center justify-center bg-treviantWhite">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Treviant Logo" className="h-16 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-treviantBlue">Treviant Shipping Login</h1>
        </div>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
          <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
          <button type="submit" className="bg-treviantBlue text-white px-4 py-2 w-full rounded">Log In</button>
        </form>
      </div>
    </div>
  );
}
