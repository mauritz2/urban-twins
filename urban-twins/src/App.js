import './App.css';
import SearchBox from './components/SearchBox.js';

function App() {
  return (
      <div className="container background-image"> 
        <div className="header">
          <img className="logo" src="/images/logo_v2.png" alt="Urban Twins logo" />
          <h1>Urban Twins</h1>
        </div>
        <div className="detailed-text">
          <p>
            Use AI to understand the vibe of new city's neighborhoods by finding their equivalents in a city you know, for example when planning a vacation, booking a hotel or moving to a new city
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
        <div className="search-button">
          <button>Find urban twins</button>
        </div>
      </div>
  );
}

export default App;
