import { useState } from 'react';
import './App.css';
import Search from './components/Search';
import Spinner from './components/Spinner';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  function search(query) {
    setIsLoading(true);
    fetch(
      `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&query=${query}`,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      });
  }

  return (
    <div className="app">
      <h1>Image Search</h1>
      <Search search={search} />
      {isLoading && <Spinner />}
    </div>
  );
}

export default App;
