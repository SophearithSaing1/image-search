import { useState } from 'react';
import './Search.css';

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
    <div className="search">
      <input
        className="search--input"
        type="text"
        placeholder="Enter keywords"
        value={query}
        onChange={inputChangeHandler}
        onKeyUp={keyUpHandler}
      />
      <button className="search--button" onClick={searchHandler}>
        Search
      </button>
    </div>
  );
}

export default Search;
