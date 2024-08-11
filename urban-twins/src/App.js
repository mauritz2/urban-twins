import './App.css';
import SearchBox from './components/SearchBox.js';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; 
import ComparisonPage from "./components/ComparisonPage";
import MapComponent from './components/MapComponent.js';


// TODO - generate a URL when search selects a city so that it's linkeable, and store the results potentially

function Home(){
  const navigate = useNavigate();

  return(
      <div className="container"> 
        <div className="header">
          <div className="header-text">
            <h2>NYC Urban Twins</h2>
            <p>Understand NYC neighborhoods by letting AI find their equivalents in your city - for instance when figuring out where to stay</p>
          </div>
          <div className="search-form">
            <div className="search-box">
              <SearchBox placeholder="Your city (e.g., Paris)" label="Your city" />
            </div>
            <div className="search-button">
              <input type="button" value="Explore" onClick={() => navigate('/comparison')} />
            </div>
          </div>
        </div>
        <div>
            <MapComponent />
        </div>
      </div>
  );
}

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comparison" element={<ComparisonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
