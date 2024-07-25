import './App.css';
import SearchBox from './components/SearchBox.js';

function App() {
  return (
      <div className="container background-image"> 
        <header className="header">
          <h1>Urban Twins</h1>
          <p>Understand the neighborhoods in a new city by finding equivalent neighborhoods in your own city</p>
        </header>
        <main className="main">
          <SearchBox />
          <SearchBox />
        </main>
      </div>
  );
}

export default App;
