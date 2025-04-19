import React, { useState, useEffect } from 'react';
import AutocompleteInput from '../../components/AutocompleteInput';
import AddressForm from '../../components/AddressForm';
import axios from 'axios';

const ShippingLabelApp = () => {
  const [fromAddress, setFromAddress] = useState({});
  const [toAddress, setToAddress] = useState({});
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '', weight: '' });
  const [deliveryDate, setDeliveryDate] = useState('');
  const [rates, setRates] = useState([]);
  const [shipmentId, setShipmentId] = useState(null);
  const [selectedRate, setSelectedRate] = useState(null);
  const [labelUrl, setLabelUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchDimensions = async () => {
    try {
      const res = await axios.get('/api/qboid/dimensions');
      setDimensions(res.data);
    } catch (err) {
      console.error('Failed to fetch dimensions:', err);
    }
  };

  const handleFetchRates = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/shipping/rates', {
        from_address: fromAddress,
        to_address: toAddress,
        parcel: dimensions,
        required_delivery_date: deliveryDate
      });
      setRates(res.data.rates);
      setShipmentId(res.data.shipmentId);
    } catch (err) {
      console.error('Failed to fetch rates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyLabel = async () => {
    try {
      const res = await axios.post('/api/shipping/purchase', {
        shipmentId,
        rateId: selectedRate.id
      });
      setLabelUrl(res.data.labelUrl);

      // Save shipment to user history
      await axios.post('/api/shipping/history', {
        from_address: fromAddress,
        to_address: toAddress,
        dimensions,
        deliveryDate,
        selectedRate,
        labelUrl: res.data.labelUrl
      });

    } catch (err) {
      console.error('Failed to buy label:', err);
    }
  };

  useEffect(() => {
    handleFetchDimensions();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen text-gray-900">
      <img src="/logo/treviant-logo.svg" alt="Treviant Logo" className="h-12 mb-4" />
      <h1 className="text-3xl font-bold mb-4 text-navy">Treviant Shipping</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">From Address</h2>
          <AutocompleteInput onSelect={setFromAddress} />
          <AddressForm address={fromAddress} onChange={setFromAddress} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">To Address</h2>
          <AutocompleteInput onSelect={setToAddress} />
          <AddressForm address={toAddress} onChange={setToAddress} />
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-medium mb-1">Required Delivery Date</label>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mt-6 flex gap-4">
        <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={handleFetchDimensions}>
          Fetch Qboid Dimensions
        </button>
        <button className="bg-navy text-white px-4 py-2 rounded" onClick={handleFetchRates}>
          {loading ? 'Fetching...' : 'Fetch Rates'}
        </button>
      </div>

      {rates.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Available Rates</h2>
          <ul className="space-y-2">
            {rates.map((rate) => (
              <li
                key={rate.id}
                onClick={() => setSelectedRate(rate)}
                className={`border p-3 rounded cursor-pointer ${selectedRate?.id === rate.id ? 'bg-gray-200 border-navy' : ''}`}
              >
                {rate.carrier} {rate.service} - ${rate.rate} - ETA {rate.estimated_delivery_days} day(s)
              </li>
            ))}
          </ul>

          {selectedRate && (
            <div className="mt-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleBuyLabel}
              >
                Purchase Label
              </button>
            </div>
          )}
        </div>
      )}

      {labelUrl && (
        <div className="mt-6 bg-green-50 p-4 border border-green-400 rounded">
          <p className="mb-2 font-semibold">Label Ready!</p>
          <a href={labelUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
            Download Shipping Label
          </a>
        </div>
      )}
    </div>
  );
};

export default ShippingLabelApp;
