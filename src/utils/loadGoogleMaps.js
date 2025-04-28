// src/utils/loadGoogleMaps.js

export function loadGoogleMaps(apiKey) {
    return new Promise((resolve, reject) => {
      if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
        resolve(window.google.maps);
        return;
      }
  
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
  
      script.onload = () => {
        if (window.google && window.google.maps) {
          resolve(window.google.maps);
        } else {
          reject(new Error('Google Maps SDK not available.'));
        }
      };
  
      script.onerror = () => reject(new Error('Failed to load Google Maps SDK.'));
  
      document.head.appendChild(script);
    });
  }
  