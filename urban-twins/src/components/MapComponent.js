import React, { useEffect, useRef} from "react";
import '../Map.css';

function MapComponent() {
  
  const mapRef = useRef(null);
  const nycCenter = { lat: 40.7831, lng: -73.9712 };
  const nycBoundaries = {"north": 40.915255, "south": 40.559000, "west": -74.255735, "east": -73.700272};

    useEffect(() => {
      const initMap = () => {
        const map = new window.google.maps.Map(mapRef.current, {
          center: nycCenter,
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

        //const neighborhoodsToDisplay = {'east-village.txt', 'upper-west-side.txt'];
        const neighborhoodsToDisplay = [
          {filename: "east-village.txt", label: "East Village (Marais)"},
          {filename: "upper-west-side.txt", label: "Upper West Side (7th arr.)"},
        ]

        neighborhoodsToDisplay.forEach(neighborhood => {
          fetch('./neighborhoods/' + neighborhood.filename)
            .then(response => response.text())
            .then(data => {
              let neighborhoodCoords = parseCoords(data);
              let neighborhoodMapPolygon = getMapPolygon(neighborhoodCoords);
              neighborhoodMapPolygon.setMap(map);

              let center = getNeighborhoodCenter(neighborhoodCoords);
              const mapLabel = new window.MapLabel({
                text: neighborhood.label,
                position: center,
                map: map,
                fontSize: 14,
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

const getMapPolygon = (neighborhoodCoords) => {
  return new window.google.maps.Polygon({
    paths: neighborhoodCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });
}

const getNeighborhoodCenter = (neighborhoodCoords) => {
  const bounds = new window.google.maps.LatLngBounds();
  neighborhoodCoords.forEach(coord => bounds.extend(coord));
  return bounds.getCenter();
}

export default MapComponent;