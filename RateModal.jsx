import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const RateModal = ({ onClose, rates, shipFrom, shipTo, dimensions, requiredDeliveryDate }) => {
  const [labelUrl, setLabelUrl] = useState(null);

  const handleBuy = async (rate) => {
    const payload = {
      rate_id: rate.id,
      ship_from: shipFrom,
      ship_to: shipTo,
      dimensions,
      required_delivery_date: requiredDeliveryDate,
      user_email: 'test@example.com', // replace with auth context
    };

    try {
      const res = await fetch('/api/shipping/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setLabelUrl(data.label_url);
    } catch (err) {
      console.error('Label purchase failed:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Available Rates</h2>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {rates.map((rate) => (
            <li key={rate.id} className="flex justify-between items-center border p-2 rounded">
              <div>
                {rate.carrier} - {rate.service} - ${rate.rate}
              </div>
              <Button onClick={() => handleBuy(rate)}>Buy</Button>
            </li>
          ))}
        </ul>

        {labelUrl && (
          <div className="mt-4">
            <a
              href={labelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Download Label
            </a>
          </div>
        )}

        <div className="mt-4 text-right">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default RateModal;
