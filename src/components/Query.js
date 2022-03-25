import classes from './Query.module.css';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearAllQuery } from '../store/querySlice';

function Query({search, queries}) {
  const dispatch = useDispatch();

  function clearHandler() {
    dispatch(clearAllQuery());
  }

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
            onClick={() => search(query)}
          >
            {query}
          </Typography>
        ))}
    </Box>
  );
}

export default Query;
