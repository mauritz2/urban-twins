import React, { useEffect } from "react";
import '../Map.css';

function MapComponent() {
  useEffect(() => {
    async function initMap() {
      // Ensure the Google Maps API is loaded
      if (typeof google !== 'undefined' && google.maps) {
        const { Map } = google.maps;

        new Map(document.getElementById("map"), {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
      } else {
        console.error("Google Maps JavaScript API not loaded.");
      }
    }

    initMap();
  }, []);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}

export default MapComponent;