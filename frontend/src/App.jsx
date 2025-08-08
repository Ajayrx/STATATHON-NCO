import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import ResultsList from './components/ResultsList';

function App() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleSearch = async (query) => {
    setLoading(true);           // Start spinner
    setHasSearched(true);       // Trigger result area
    try {
      const response = await fetch('http://localhost:8000/api/v1/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
      alert('Search failed. Check backend connection.');
    } finally {
      setLoading(false); // ✅ Stop spinner
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-800">
          <span className="inline-block mr-2">🔍</span>
          Smart NCO-2015 Job Code Search
        </h1>
        <SearchBox onSearch={handleSearch} loading={loading} />
        <ResultsList results={results} hasSearched={hasSearched} loading={loading} />
      </div>
    </div>
  );
}

export default App;
