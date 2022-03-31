import classes from './Query.module.css';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearAllQuery } from '../store/querySlice';
import { useCallback } from 'react';

interface Props {
  onSearch: (query: string) => void;
  queries: string[];
}

const Query: React.FC<Props> = ({ onSearch, queries }) => {
  const dispatch = useDispatch();

  const clearHandler = () => {
    dispatch(clearAllQuery());
  }

  const searchHandler = useCallback(
    (query: string) => () => onSearch(query),
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
