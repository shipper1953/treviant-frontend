
import { useState, useEffect } from 'react';
import { loadGoogleMaps } from '../utils/loadGoogleMaps';

export function useAddressAutocomplete(initialValue, onSelect) {
  const [input, setInput] = useState(initialValue || '');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!input) return;

    loadGoogleMaps().then((google) => {
      const service = new google.maps.places.AutocompleteService();

      service.getPlacePredictions(
        {
          input,
          types: ['address'],
          componentRestrictions: { country: 'us' },
        },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        }
      );
    });
  }, [input]);

  const handleSelect = (placeId) => {
    loadGoogleMaps().then((google) => {
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      );
  
      service.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const result = {
            street1: '',
            city: '',
            state: '',
            zip: '',
          };
  
          for (const comp of place.address_components) {
            const types = comp.types;
            if (types.includes('street_number')) result.street1 = comp.long_name + ' ';
            if (types.includes('route')) result.street1 += comp.long_name;
            if (types.includes('locality')) result.city = comp.long_name;
            if (types.includes('administrative_area_level_1')) result.state = comp.short_name;
            if (types.includes('postal_code')) result.zip = comp.long_name;
          }
  
          onSelect(result); // updates parent state
          setInput(result.street1);
  
          // 🧠 Clear suggestions after render cycle to avoid dropdown flicker
          setTimeout(() => {
            // Extra delay ensures dropdown clears after the click is registered
            setSuggestions([]);
          }, 100); // 100ms ensures it doesn't block the UI          
        }
      });
    });
  };  

  return {
    input,
    setInput,
    suggestions,
    handleSelect,
  };
}
