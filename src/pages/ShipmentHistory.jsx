// src/features/ship/ShipmentHistory.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import { applyMiddleware } from 'redux';

export default function ShipmentHistory() {
  const userEmail = useSelector((state) => state.user.email);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userEmail) {
      api.get(`/api/shipments?email=${userEmail}`)
        .then(res => {
          setShipments(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch shipment history:', err);
          setLoading(false);
        });
    }
  }, [userEmail]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shipment History</h2>

      {loading ? (
        <p>Loading shipments...</p>
      ) : shipments.length === 0 ? (
        <p>No shipments found.</p>
      ) : (
        <div className="bg-white shadow rounded-xl overflow-x-auto">
          <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Barcode</th>
              <th className="px-4 py-2">Carrier</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Cost</th>
              <th className="px-4 py-2">Tracking</th>
              <th className="px-4 py-2">Label</th>
            </tr>
          </thead>
            <tbody>
              {shipments.map((s, idx) => (
                <tr key={idx} className="border-t">
                <td className="px-4 py-2">{new Date(s.created_at).toLocaleString()}</td>
                <td className="px-4 py-2">{s.code}</td>
                <td className="px-4 py-2">{s.carrier}</td>
                <td className="px-4 py-2">{s.service}</td>
                <td className="px-4 py-2">${s.cost}</td>
                <td className="px-4 py-2">
                  <a
                    href={s.tracking_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    {s.tracking_code}
                  </a>
                </td>
                <td className="px-4 py-2">
                  <a
                    href={s.label_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download PDF
                  </a>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}