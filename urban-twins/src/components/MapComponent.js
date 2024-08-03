import React, { useEffect, useRef} from "react";
import '../Map.css';

function MapComponent() {
  
  const mapRef = useRef(null);

    useEffect(() => {
      // needs re-work when backend is setup
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const address = "New York";
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            const map = new window.google.maps.Map(mapRef.current, {
              center: location,
              zoom: 12,
            });
            new window.google.maps.Marker({
              position: location,
              map: map,
            });
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }, []);
    
    return (
        <div ref={mapRef} className="map"></div>
    );
  }
  
  export default MapComponent;