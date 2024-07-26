import './App.css';
import SearchBox from './components/SearchBox.js';

function App() {
  return (
      <div className="container background-image"> 
        <div className="header">
          <h1>Urban Twins</h1>
        </div>
        <div className="detailed-text">
          <p>Understand the neighborhoods in a new city by finding equivalent neighborhoods in your own city</p>
        </div>
        <div className="search-boxes">
          <div>
            <SearchBox placeholder="New York" label="City to explore" />
          </div>
          <div>
            <SearchBox placeholder="Paris" label="City to compare" />
          </div>
        </div>
      </div>
  );
}

export default App;
