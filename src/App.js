import './App.css';
import Search from './components/Search';

function App() {
  function search(query) {
    fetch(
      `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&query=${query}`,
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div className="app">
      <h1>Image Search</h1>
      <Search search={search} />
    </div>
  );
}

export default App;
