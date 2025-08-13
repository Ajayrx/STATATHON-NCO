import React from "react";
import { Code, BarChart2, AlignLeft } from "lucide-react";

function ResultsList({ results, hasSearched, loading }) {
  if (!hasSearched) return null;

  return (
    <div className="mt-8 min-h-[3rem]">
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Searching...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {results.map((res, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.03]"
            >
              {/* Accent colored top border */}
              <div className="border-t-4 border-primary rounded-t-lg"></div>

              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold text-primary mb-4 border-b border-gray-200 pb-2">
                  {res.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-800 mb-2">
                  <Code size={18} className="text-primary" />
                  <span className="font-semibold">Code:</span>
                  <span className="font-mono">{res.nco_code}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <BarChart2 size={18} className="text-primary" />
                  <span className="font-semibold">Score:</span>
                  <span>{res.score.toFixed(4)}</span>
                </div>

                {res.description && (
                  <div className="flex gap-2 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap flex-grow">
                    <AlignLeft size={18} className="text-primary mt-1" />
                    <div>
                      <span className="font-semibold">Description:</span>{" "}
                      <p className="mt-1">{res.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4 text-center">No results found.</p>
      )}
    </div>
  );
}

export default ResultsList;
