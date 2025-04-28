let scriptLoaded = false;

export function loadGoogleMaps(callback) {
  if (scriptLoaded) {
    callback();
    return;
  }

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
  script.async = true;
  script.defer = true;

  script.onload = () => {
    scriptLoaded = true;
    callback();
  };

  document.body.appendChild(script);
}

  