import '../Map.css';
import React from "react";
import SearchBox from './SearchBox';
import MapComponent from './MapComponent';

function ComparisonPage() {
  return (
    <div className="container background-image"> 
        <h1>Comparison between New York and Paris</h1>
        <div className='map'>
            <MapComponent />
        </div>
    </div>
  );
}

export default ComparisonPage;