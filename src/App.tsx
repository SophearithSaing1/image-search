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
import { onSearch, onShowError } from './utils/SearchUtils';
import { RootState } from './store/store';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const queries = useSelector((state: RootState) => state.query.value);

  const search = useCallback(async (query) => {
    setIsLoading(true);
    setError(null);
    setImages([]);

    const { results, error } = await onSearch(query);

    if (results) {
      setImages(results);
    } else if (error) {
      setError(error);
    }

    setIsLoading(false);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Box className={classes.app}>
        <Typography variant="h3" component="h1" className={classes.title}>
          Image Search
        </Typography>
        <Search onSearch={search} onShowError={onShowError} />
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
