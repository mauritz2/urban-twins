import React from "react";
import MapComponent from './MapComponent';

function ComparisonPage() {
  return (
    <div className="container background-image"> 
        <h1>Comparison between New York and Paris</h1>
        <div>
            <MapComponent />
        </div>
    </div>
  );
}

export default ComparisonPage;