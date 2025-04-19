const API_BASE = '/api/shipping';

export const getRates = async (shipmentData) => {
  const res = await fetch(`${API_BASE}/rates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shipmentData),
  });
  return res.json();
};

export const purchaseLabel = async (purchaseData) => {
  const res = await fetch(`${API_BASE}/purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(purchaseData),
  });
  return res.json();
};

export const getShipmentHistory = async () => {
  const res = await fetch(`${API_BASE}/history`);
  return res.json();
};
