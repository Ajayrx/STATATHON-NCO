import React, { useState } from 'react';
import SearchBox from '../components/SearchBox';
import ResultsList from '../components/ResultsList';

function Home() {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    const res = await fetch(`/api/v1/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="max-w-xl mx-auto">
      <SearchBox onSearch={handleSearch} />
      <ResultsList results={results} />
    </div>
  );
}

export default Home;
