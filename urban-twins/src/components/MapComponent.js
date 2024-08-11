import React, { useEffect, useRef} from "react";
import '../Map.css';

function MapComponent() {
  
  const mapRef = useRef(null);

    useEffect(() => {
      const centerOfManhattan = { lat: 40.7831, lng: -73.9712 };
      const nycBoundaries = {"north": 40.915255, "south": 40.559000, "west": -74.255735, "east": -73.700272};
      const initMap = () => {
        const map = new window.google.maps.Map(mapRef.current, {
          center: centerOfManhattan,
          zoom: 12,
          strictBounds: true,
          restriction: {
            latLngBounds: {
              north: nycBoundaries.north,
              south: nycBoundaries.south,
              west: nycBoundaries.west,
              east: nycBoundaries.east
            }
          },
        });

        //const neighborhoodsToDisplay = ['upper-west-side.txt'];
        const neighborhoodsToDisplay = ['east-village.txt', 'upper-west-side.txt'];

        neighborhoodsToDisplay.forEach(neighborhoodFile => {

          fetch('./neighborhoods/' + neighborhoodFile)
            .then(response => response.text())
            .then(data => {
              let coordsArray = parseCoords(data);

              const manhattanCoords = coordsArray;
              
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

            // Set the label of the polygon
            const bounds = new window.google.maps.LatLngBounds();
            manhattanCoords.forEach(coord => bounds.extend(coord));
            const center = bounds.getCenter();
            const mapLabel = new window.MapLabel({
              text: "East Village (Marais)",
              position: center,
              map: map,
              fontSize: 12,
              align: 'center',
            });

          mapLabel.set('position', center);
        })
      });
    };
    
    initMap();
    
    }, []);
  
    return (
      <div>
        <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>
      </div>
    );
  }
  
const parseCoords = (coordsText) => {
  return coordsText.trim().split('\n').map(line => {
    const [lng, lat] = line.trim().split(/\s+/);
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  });
}

  
  export default MapComponent;