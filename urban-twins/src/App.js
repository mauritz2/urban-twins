import './App.css';
import SearchBox from './components/SearchBox.js';

function App() {
  return (
      <div className="container background-image"> 
        <div className="header">
          <h1>Urban Twins</h1>
        </div>
        <div className="detailed-text">
          <p>
            Use AI to understand the vibe of neighborhoods of a new city by finding their equivalent in a city you know. 
            For example when planning a vacation, booking a hotel or moving to a new city
          </p>
        </div>
        <div className="search-boxes">
          <div>
            <SearchBox placeholder="New York" label="City to explore" />
          </div>
          <div>
            <SearchBox placeholder="Paris" label="City you know" />
          </div>
        </div>
      </div>
  );
}

export default App;
