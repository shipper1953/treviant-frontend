import React, { useState, useEffect } from 'react';

export default function AddressAutocomplete({ value, onChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!touched || !value || value.length < 3) {
      setSuggestions([]);
      return;
    }
  
    const fetchSuggestions = async () => {
      try {
        const res = await fetch('/api/autocomplete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: value }),
        });
  
        const data = await res.json();
  
        // Check both common formats
        const rawSuggestions = data.suggestions || data.predictions;
  
        if (Array.isArray(rawSuggestions)) {
          setSuggestions(rawSuggestions.map((s) => s.placePrediction || s));
        } else {
          console.warn('Google Autocomplete returned no usable suggestions:', data);
          setSuggestions([]);
        }
  
      } catch (err) {
        console.error('Autocomplete fetch error:', err);
      }
    };
  
    fetchSuggestions();
  }, [value, touched]);  

  return (
    <div className="relative">
      <input
        className="w-full px-3 py-2 border rounded"
        placeholder="Start typing an address..."
        value={value}
        onChange={(e) => {
          setTouched(true);
          onChange(e.target.value);
        }}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border mt-1 w-full z-10 rounded shadow max-h-48 overflow-y-auto">
          {suggestions.map((prediction, index) => (
<li
  key={index}
  onClick={async () => {
    const res = await fetch('/api/place-details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placeId: prediction.placeId }),
    });

    const data = await res.json();

    if (data && data.addressComponents) {
      const addressMap = {};
      for (const component of data.addressComponents) {
        const type = component.types[0];
        const value = component.shortText || component.text?.text || '';

        if (type === 'locality') addressMap.city = value;
        if (type === 'administrative_area_level_1') addressMap.state = value;
        if (type === 'postal_code') addressMap.zip = value;
        if (type === 'street_number') addressMap.street_number = value;
        if (type === 'route') addressMap.route = value;
      }

      const street1 = `${addressMap.street_number || ''} ${addressMap.route || ''}`.trim();

      onChange({
        street1,
        city: addressMap.city || '',
        state: addressMap.state || '',
        zip: addressMap.zip || '',
      });
    }
    setSuggestions([]); // Clear suggestions
  }}
  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
>
  {prediction.structuredFormat?.mainText?.text}
  <small className="block text-gray-500 text-sm">
    {prediction.structuredFormat?.secondaryText?.text}
  </small>
</li>
))}

        </ul>
      )}
    </div>
  );
}
