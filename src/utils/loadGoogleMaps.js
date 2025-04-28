let scriptLoaded = false;

export function loadGoogleMaps(callback) {
  if (scriptLoaded) {
    callback();
    return;
  }

  const script = document.createElement('script');
  sscript.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;

  script.onload = () => {
    scriptLoaded = true;
    callback();
  };

  document.body.appendChild(script);
}

  