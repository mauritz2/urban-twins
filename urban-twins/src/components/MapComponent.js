import React, { useEffect } from "react";
import '../Map.css';

function MapComponent() {
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const address = "New York";
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  console.log("Hello from MapComponent component");

  // Rest of your code...

}
export default MapComponent;