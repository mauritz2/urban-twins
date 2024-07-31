import '../Map.css';
import React from "react";
import SearchBox from './SearchBox';
import MapComponent from './MapComponent';

function ComparisonPage() {
  return (
    <div className="container background-image"> 
        <h1>Comparison between New York and Paris</h1>
        <div>
            <SearchBox placeholder="New York" label="City to explore" />
        </div>
        <div>
            <SearchBox placeholder="Paris" label="City you know" />
        </div>
        <MapComponent />
        <img className="map" src="/images/map-placeholder.png" alt="Map" />
    </div>
  );
}

export default ComparisonPage;