import { useCallback, useState } from 'react';
import classes from './App.module.css';
import Images from './components/Images';
import Search from './components/Search';
import {
  Box,
  CircularProgress,
  StyledEngineProvider,
  Typography,
} from '@mui/material';
import Query from './components/Query';
import { useSelector } from 'react-redux';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const queries = useSelector((state) => state.query.value);

  const showErrorMessage = useCallback((query) => {
    if (query) {
      setError(`There's no result for ${query}!`);
    } else if (query === '') {
      setError('Please enter keywords!');
    } else {
      setError('Something went wrong, please try again later!');
    }
    setIsLoading(false);
  }, []);

  const search = useCallback(
    (query) => {
      if (query.trim() === '') {
        showErrorMessage('');
        return;
      }
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
    },
    [showErrorMessage],
  );

  return (
    <StyledEngineProvider injectFirst>
      <Box className={classes.app}>
        <Typography variant="h3" component="h1" className={classes.title}>
          Image Search
        </Typography>
        <Search onSearch={search} onShowError={showErrorMessage} />
        <Box className={classes.content}>
          {isLoading && (
            <Box className={classes['spinner-container']}>
              <CircularProgress className={classes.spinner} />
            </Box>
          )}
          {!isLoading && error && (
            <Typography variant="h5" component="p" className={classes.error}>
              {error}
            </Typography>
          )}
          {!isLoading && images.length > 0 && <Images images={images} />}
          {queries.length > 0 && <Query onSearch={search} queries={queries} />}
        </Box>
      </Box>
    </StyledEngineProvider>
  );
}

export default App;
