import React, { useCallback, useState } from 'react';
import classes from './Search.module.css';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addQuery } from '../store/querySlice';

interface Props {
  onSearch: (query: string) => void;
  onShowError: (query: string) => void;
}

const Search: React.FC<Props> = ({ onSearch, onShowError }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const inputChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    []
  );

  const searchHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSearch(query);
    },
    [onSearch, query]
  );

  const saveQuery = useCallback(() => {
    if (query.trim() === '') {
      onShowError('');
    } else {
      dispatch(addQuery(query));
    }
  }, [dispatch, onShowError, query]);

  return (
    <form className={classes.search} onSubmit={searchHandler}>
      <TextField
        className={classes['search--input']}
        label="Enter keywords"
        variant="outlined"
        value={query}
        onChange={inputChangeHandler}
      />
      <Button
        type="submit"
        variant="outlined"
        className={classes['search--button']}
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
    </form>
  );
};

export default Search;
