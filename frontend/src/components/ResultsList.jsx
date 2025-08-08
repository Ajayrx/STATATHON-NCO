import React from 'react';

function ResultsList({ results, hasSearched, loading }) {
  if (!hasSearched) return null; // Don't show before search

  return (
    <div className="mt-8 min-h-[3rem]">
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Searching...</p>
      ) : results.length > 0 ? (
        <ul className="space-y-4 animate-fade-in">
          {results.map((res, idx) => (
            <li
              key={idx}
              className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded shadow-md transition-transform transform hover:scale-[1.02]"
            >
              <h3 className="font-semibold text-lg text-blue-900">{res.title}</h3>
              <p className="text-gray-700 text-sm">Code: <span className="font-mono">{res.nco_code}</span></p>
              <p className="text-gray-600 text-sm">Score: {res.score.toFixed(4)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4 text-center">No results found.</p>
      )}
    </div>
  );
}

export default ResultsList;
