import { useState } from 'react';
import './App.css';
import Images from './components/Images';
import Search from './components/Search';
import Spinner from './components/Spinner';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  function search(query) {
    setIsLoading(true);
    fetch(
      `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&query=${query}`,
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
      {images.length > 0 && !isLoading && <Images images={images} />}
    </div>
  );
}

export default App;
