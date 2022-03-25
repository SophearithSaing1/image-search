import { useState } from 'react';
import classes from './Search.module.css';
import { Box, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addQuery } from '../store/querySlice';

function Search({ search, showError }) {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  function inputChangeHandler(event) {
    setQuery(event.target.value);
  }

  function searchHandler() {
    search(query);
  }

  function keyUpHandler(event) {
    if (event.key === 'Enter') {
      search(query);
    }
  }

  function saveQuery() {
    if (query.trim() === '') {
      showError('');
    } else {
      dispatch(addQuery(query));
    }
  }

  return (
    <Box className={classes.search}>
      <TextField
        className={classes['search--input']}
        label="Enter keywords"
        variant="outlined"
        value={query}
        onChange={inputChangeHandler}
        onKeyUp={keyUpHandler}
      />
      <Button
        variant="outlined"
        className={classes['search--button']}
        onClick={searchHandler}
      >
        Search
      </Button>
      <Button
        variant="outlined"
        className={classes['search--button']}
        onClick={saveQuery}
      >
        Save
      </Button>
    </Box>
  );
}

export default Search;
