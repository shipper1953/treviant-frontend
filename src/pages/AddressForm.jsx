import AutocompleteInput from '../components/AutocompleteInput';
import { useAddressAutocomplete } from '../hooks/useAddressAutocomplete';

export default function AddressForm({ title, address, setAddress }) {
  const { input, setInput, suggestions, handleSelect } = useAddressAutocomplete(address, setAddress);

  const handleChange = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-1 p-4 border rounded shadow bg-white space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      
      <AutocompleteInput
        input={input}
        setInput={setInput}
        suggestions={suggestions}
        onSelect={handleSelect}
        address={address}
      />

      <input
        type="text"
        className="w-full px-3 py-2 border rounded"
        placeholder="Street 2"
        value={address.street2}
        onChange={(e) => handleChange('street2', e.target.value)}
      />
      <input
        type="text"
        className="w-full px-3 py-2 border rounded"
        placeholder="City"
        value={address.city}
        onChange={(e) => handleChange('city', e.target.value)}
      />
      <input
        type="text"
        className="w-full px-3 py-2 border rounded"
        placeholder="State"
        value={address.state}
        onChange={(e) => handleChange('state', e.target.value)}
      />
      <input
        type="text"
        className="w-full px-3 py-2 border rounded"
        placeholder="ZIP Code"
        value={address.zip}
        onChange={(e) => handleChange('zip', e.target.value)}
      />
      <input
        type="text"
        className="w-full px-3 py-2 border rounded"
        placeholder="Phone"
        value={address.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
      />
      <input
        type="email"
        className="w-full px-3 py-2 border rounded"
        placeholder="Email"
        value={address.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
    </div>
  );
}
