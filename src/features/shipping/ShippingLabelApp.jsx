import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/utils/api';
import AutocompleteInput from '../../components/AutocompleteInput';
import { useAddressAutocomplete } from '../../hooks/useAddressAutocomplete';
import Layout from '../../components/Layout';

function Loader() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white bg-opacity-80 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-24 h-24"
          animate={{ rotateY: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-sm shadow-lg animate-pulse" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function RateModal({ rates, selectedRateId, setSelectedRateId, handlePurchaseLabel, onClose, trackingCode, labelUrl, isLabelLoading, purchasedRate }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
        {isLabelLoading ? (
          <Loader />
        ) : trackingCode && labelUrl ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">Label Purchased!</h3>
            <p className="mb-1"><strong>Carrier:</strong> {purchasedRate?.carrier}</p>
            <p className="mb-1"><strong>Service:</strong> {purchasedRate?.service}</p>
            <p className="mb-1"><strong>Cost:</strong> ${purchasedRate?.rate}</p>
            <p className="mb-4">
              <strong>Tracking #:</strong>{" "}
              <a
                href={`https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${trackingCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {trackingCode}
              </a>
            </p>
            <a href={labelUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              Download Label
            </a>
            <div className="mt-4">
              <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Close</button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-4">Available Rates</h3>
            <select
              value={selectedRateId}
              onChange={(e) => setSelectedRateId(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-4"
            >
              <option value="">Select Rate</option>
              {rates.map((rate) => (
                <option key={rate.id} value={rate.id}>
                  {rate.carrier} - {rate.service} - ${rate.rate} (Est. {rate.delivery_days} days)
                </option>
              ))}
            </select>
            <div className="flex justify-center gap-4">
              <button onClick={handlePurchaseLabel} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Purchase Label</button>
              <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ShippingLabelApp() {
  const user = useSelector((state) => state.user);
  const [barcode, setBarcode] = useState("");
  const [fromAddress, setFromAddress] = useState({ company: "", name: "", street1: "", street2: "", city: "", state: "", zip: "", phone: "", email: "" });
  const [toAddress, setToAddress] = useState({ company: "", name: "", street1: "", street2: "", city: "", state: "", zip: "", phone: "", email: "" });
  const [rates, setRates] = useState([]);
  const [shipmentId, setShipmentId] = useState("");
  const [selectedRateId, setSelectedRateId] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [labelUrl, setLabelUrl] = useState("");
  const [showRatesModal, setShowRatesModal] = useState(false);
  const [isLabelLoading, setIsLabelLoading] = useState(false);
  const [purchasedRate, setPurchasedRate] = useState(null);

  const { input, setInput, suggestions, handleSelect } = useAddressAutocomplete(toAddress, setToAddress);

  useEffect(() => {
    if (user && user.email) {
      setFromAddress({
        company: user.company || "",
        name: user.name || "",
        street1: user.street1 || "",
        street2: user.street2 || "",
        city: user.city || "",
        state: user.state || "",
        zip: user.zip || "",
        phone: user.phone || "",
        email: user.default_email || ""
      });
    }
  }, [user]);

  const handleRateFetch = async () => {
    try {
      const res = await api.post("/api/shipping-rates", {
        from: fromAddress,
        to: toAddress,
        barcode,
      });
      setShipmentId(res.data.shipmentId);
      setRates(res.data.rates || []);
      setSelectedRateId("");
      setShowRatesModal(true);
    } catch (error) {
      console.error("Rate fetch error", error);
    }
  };

  const handlePurchaseLabel = async () => {
    try {
      if (!selectedRateId) return alert("Please select a rate.");
      if (!shipmentId) return alert("No shipment ID available. Please fetch rates again.");
      const rate = rates.find((r) => r.id === selectedRateId);
      setPurchasedRate(rate);
      setIsLabelLoading(true);

      const res = await api.post("/api/label", {
        shipmentId,
        rateId: selectedRateId,
        email: user.email,
        barcode,
      });

      if (res.data.success) {
        setTrackingCode(res.data.tracking);
        setLabelUrl(res.data.label_url);
      }
    } catch (error) {
      console.error("Purchase label failed", error);
    } finally {
      setIsLabelLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Shipping Label Creator</h2>

        <input
          placeholder="Barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border rounded"
        />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 p-4 border rounded shadow bg-white space-y-4">
            <h3 className="text-lg font-semibold">To Address</h3>
            <AutocompleteInput
              input={input}
              setInput={setInput}
              suggestions={suggestions}
              onSelect={handleSelect}
              address={toAddress}
            />
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Street 2"
              value={toAddress.street2}
              onChange={(e) => setToAddress({ ...toAddress, street2: e.target.value })}
            />
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Phone"
              value={toAddress.phone}
              onChange={(e) => setToAddress({ ...toAddress, phone: e.target.value })}
            />
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              placeholder="Email"
              value={toAddress.email}
              onChange={(e) => setToAddress({ ...toAddress, email: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleRateFetch}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Fetch Shipping Rates
          </button>
        </div>

        {showRatesModal && (
          <RateModal
            rates={rates}
            selectedRateId={selectedRateId}
            setSelectedRateId={setSelectedRateId}
            handlePurchaseLabel={handlePurchaseLabel}
            onClose={() => setShowRatesModal(false)}
            trackingCode={trackingCode}
            labelUrl={labelUrl}
            isLabelLoading={isLabelLoading}
            purchasedRate={purchasedRate}
          />
        )}
      </div>
    </Layout>
  );
}
