import './App.css';
import SearchBox from './components/SearchBox.js';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; 
import ComparisonPage from "./components/ComparisonPage";


function Home(){
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/comparison');
  };

  return(
      <div className="container background-image"> 
        <div className="header">
          <img className="logo" src="/images/logo_v2.png" alt="Urban Twins logo" />
          <h1>Urban Twins</h1>
        </div>
        <div className="detailed-text">
          <p>
            Use AI to understand the vibe of new city's neighborhoods by finding their equivalents in your city
          </p>
        </div>
        <div className="benefits">
          <h2>Example use cases</h2>
          <ul>
          <li className="benefit-title">Explore in what neighborhood to book your hotel</li>
          <li className="benefit-title">Explore where to live when moving</li>
          <li className="benefit-title">Explore where to go sightseeing</li>
          </ul>
        </div>
        <div className="search-boxes">
          <div>
            <SearchBox placeholder="New York" label="City to explore" />
          </div>
          <div>
            <SearchBox placeholder="Paris" label="Your city" />
          </div>
        </div>
        <div className="search-button">
          <button onClick={handleButtonClick}>Find urban twins</button>
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
