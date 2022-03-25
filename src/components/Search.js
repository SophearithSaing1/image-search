import { useState } from 'react';
import classes from './Search.module.css';
import { Box, Button, TextField } from '@mui/material';

function Search({ search }) {
  const [query, setQuery] = useState('');

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
    </Box>
  );
}

export default Search;
