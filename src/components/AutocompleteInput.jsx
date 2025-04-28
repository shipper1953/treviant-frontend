import React, { useEffect, useState } from 'react';

export default function AutocompleteInput({ input, setInput, suggestions, onSelect, address }) {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (address?.street1 && !input) {
      setInput(address.street1);
    }
  }, [address?.street1, input, setInput]);

  const handleChange = (e) => {
    setInput(e.target.value);
    if (!hasInteracted) setHasInteracted(true);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={input || address.street1 || ''}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        placeholder="Street 1"
        autoComplete="off"
      />

      {hasInteracted && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow-md mt-1 max-h-48 overflow-y-auto">
          {suggestions.map((s) => (
            <li
              key={s.place_id}
              onClick={() => onSelect(s.place_id)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {s.description || s.text?.text || 'Unnamed location'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
