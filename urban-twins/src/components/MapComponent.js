import React, { useEffect, useRef} from "react";
import '../Map.css';

function MapComponent() {
  
  const mapRef = useRef(null);

    useEffect(() => {
      // needs re-work when backend is setup
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const address = "New York";
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
      const initMap = () => {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 40.7831, lng: -73.9712 }, // Center of Manhattan
          zoom: 12,
        });


  
        fetch('/manhattan.txt')
          .then(response => response.text())
          .then(data => {
            let manhattanCoords;
            try {
              const coordsArray = data.trim().split('\n').map(line => {
              const [lng, lat] = line.trim().split(/\s+/);
              return { lat: parseFloat(lat), lng: parseFloat(lng) };
              });
              manhattanCoords = coordsArray;
            } catch (error) {
              console.error('Error parsing coordinates:', error);
              return;
            }
            
            // Construct the polygon.
            const manhattanPolygon = new window.google.maps.Polygon({
              paths: manhattanCoords,
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
            });

            manhattanPolygon.setMap(map);

          // Calculate the center of the polygon
          const bounds = new window.google.maps.LatLngBounds();
          manhattanCoords.forEach(coord => bounds.extend(coord));
          const center = bounds.getCenter();

          // Create a MapLabel at the center
          const mapLabel = new window.MapLabel({
            text: "Manhattan",
            position: center,
            map: map,
            fontSize: 20,
            align: 'center'
          });

          mapLabel.set('position', center);
        })
        .catch(error => {
          console.error('Error fetching manhattan.txt:', error);
        });
    };

  
      window.initMap = initMap;
  
      if (window.google && window.google.maps) {
        initMap();
      } else {
        window.initMap = initMap;
      }
    }, []);
  
    return (
      <div>
        <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>
      </div>
    );
  }
  
  
  export default MapComponent;