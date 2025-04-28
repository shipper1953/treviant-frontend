import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShipmentHistory } from './shipmentHistorySlice';

export default function ShipmentHistory() {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);

  const { shipments, loading, error } = useSelector((state) => state.shipmentHistory);

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchShipmentHistory(userEmail));
    }
  }, [dispatch, userEmail]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shipment History</h2>

      {loading && <p>Loading shipment history...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && shipments.length === 0 && (
        <p className="text-gray-600">No shipments found.</p>
      )}

      {!loading && shipments.length > 0 && (
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Carrier</th>
              <th className="border px-4 py-2">Service</th>
              <th className="border px-4 py-2">Rate</th>
              <th className="border px-4 py-2">Tracking #</th>
              <th className="border px-4 py-2">Label</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{new Date(s.created_at).toLocaleString()}</td>
                <td className="border px-4 py-2">{s.carrier}</td>
                <td className="border px-4 py-2">{s.service}</td>
                <td className="border px-4 py-2">${s.rate}</td>
                <td className="border px-4 py-2">
                  <a
                    href={`https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${s.tracking_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {s.tracking_code}
                  </a>
                </td>
                <td className="border px-4 py-2">
                  <a
                    href={s.label_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Label
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
