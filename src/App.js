import { useState } from 'react';
import './App.css';
import Images from './components/Images';
import Search from './components/Search';
import Spinner from './components/Spinner';

function App() {
  const [isLoading, setIsLoading] = useState(null);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');

  function search(query) {
    setQuery(query);
    setIsLoading(true);
    fetch(
      `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&query=${query}&per_page=12`,
    )
      .then((response) => response.json())
      .then((data) => {
        setImages(data.results);
        setIsLoading(false);
      });
  }

  return (
    <div className="app">
      <h1>Image Search</h1>
      <Search search={search} />
      {isLoading && <Spinner />}
      {isLoading === false && images.length === 0 && (
        <p className="no-result">There's no results for {query}</p>
      )}
      {isLoading === false && images.length > 0 && <Images images={images} />}
    </div>
  );
}

export default App;
