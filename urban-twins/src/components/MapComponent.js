import React, { useEffect, useRef} from "react";


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

            // Search box
             const input = document.getElementById("pac-input");
             const searchBox = new window.google.maps.places.SearchBox(input);
           
             map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);


            // Bias the SearchBox results towards current map's viewport.
            // Instead of biasing we should restrict in the future
            map.addListener("bounds_changed", () => {
              searchBox.setBounds(map.getBounds());
            });
              
            let markers = [];
              
            // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
            searchBox.addListener("places_changed", () => {
              const places = searchBox.getPlaces();              
                  if (places.length == 0) {
                    return;
                  }
              
                  // Clear out the old markers.
                  markers.forEach((marker) => {
                    marker.setMap(null);
                  });
                  markers = [];

              
                  // For each place, get the icon, name and location.
                  const bounds = new window.google.maps.LatLngBounds();
              
                  places.forEach((place) => {
                    if (!place.geometry || !place.geometry.location) {
                      console.log("Returned place contains no geometry");
                      return;
                    }
              
                    const icon = {
                      url: place.icon,
                      size: new window.google.maps.Size(71, 71),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(17, 34),
                      scaledSize: new window.google.maps.Size(25, 25),
                    };
              
                    // Create a marker for each place.
                    markers.push(
                      new window.google.maps.Marker({
                        map,
                        icon,
                        title: place.name,
                        position: place.geometry.location,
                      }),
                    );
                    if (place.geometry.viewport) {
                      // Only geocodes have viewport.
                      bounds.union(place.geometry.viewport);
                    } else {
                      bounds.extend(place.geometry.location);
                    }
                  });
                  map.fitBounds(bounds);
              });
            });
            //   window.initAutocomplete = initAutocomplete;                    
      });
    };
    
    initMap();

    }, []);
  
    return (
      <div>
        <div ref={mapRef} className="map"></div>
        <input id="pac-input" className="controls" type="text" placeholder="Search Box" />
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