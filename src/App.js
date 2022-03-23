import { useState } from 'react';
import './App.css';
import Images from './components/Images';
import Search from './components/Search';
import { Box, CircularProgress, Typography } from '@mui/material';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  function showErrorMessage(query) {
    if (query) {
      setError(`There's no result for ${query}!`);
    } else if (query === '') {
      setError('Please enter keywords!');
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
    <Box className="app">
      <Typography variant="h3" component="h1" className="title">
        Image Search
      </Typography>
      <Search search={search} />
      {isLoading && <CircularProgress />}
      {!isLoading && error && (
        <Typography variant="h5" component="p" className="error">
          {error}
        </Typography>
      )}
      {!isLoading && images.length > 0 && <Images images={images} />}
    </Box>
  );
}

export default App;
