import { useState } from 'react';
import './App.css';
import Images from './components/Images';
import Search from './components/Search';
import Spinner from './components/Spinner';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  function showErrorMessage(query) {
    if (query) {
      setError(`There's no result for ${query}`);
    } else {
      setError('Something went wrong, please try again later!');
    }
    setIsLoading(false);
  }

  function search(query) {
    setIsLoading(true);
    setError(null);
    setImages([]);
    fetch(
      `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&query=${query}&per_page=12`,
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          showErrorMessage();
        }
      })
      .then((data) => {
        if (data.results.length === 0) {
          showErrorMessage(query);
        } else {
          setImages(data.results);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
        showErrorMessage();
      });
  }

  return (
    <div className="app">
      <h1>Image Search</h1>
      <Search search={search} />
      {isLoading && <Spinner />}
      {!isLoading && error && <p className="error">{error}</p>}
      {!isLoading && images.length > 0 && <Images images={images} />}
    </div>
  );
}

export default App;
