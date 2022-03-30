import classes from './Query.module.css';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearAllQuery } from '../store/querySlice';
import { useCallback } from 'react';

function Query({ onSearch, queries }) {
  const dispatch = useDispatch();

  function clearHandler() {
    dispatch(clearAllQuery());
  }

  const searchHandler = useCallback(
    (query) => () => onSearch(query),
    [onSearch],
  );

  return (
    <Box className={classes.query}>
      <Box className={classes['query--title']}>
        <Typography variant="h5" component="h2">
          Saved Queries
        </Typography>
        <Typography variant="button" component="p" onClick={clearHandler}>
          clear
        </Typography>
      </Box>
      {queries.length > 0 &&
        queries.map((query, index) => (
          <Typography
            variant="h6"
            component="p"
            className={classes['query--item']}
            key={index}
            onClick={searchHandler(query)}
          >
            {query}
          </Typography>
        ))}
    </Box>
  );
}

export default Query;
