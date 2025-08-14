import React from "react";
import { Code, BarChart2, AlignLeft } from "lucide-react";

function ResultsList({ results, hasSearched, loading, chakraPositions = [] }) {
  if (!hasSearched) return null;

  return (
    <div className="mt-8 relative px-4 md:px-0">
      {loading ? (
        <p className="text-center text-[#0B3B60] animate-pulse font-semibold text-lg">
          Searching...
        </p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((res, idx) => {
            const pos = chakraPositions[idx] || {
              top: "40%",
              left: "29%",
              width: "w-36",
              opacity: 0.08 // 8% transparency
            };

            return (
              <div
                key={idx}
                className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
              >
                {/* Ashoka Chakra watermark */}
                <img
                  src="/assets/ashoka_chakra.png"
                  alt="Ashoka Chakra"
                  className={`absolute ${pos.width} -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none animate-spin-slow`}
                  style={{
                    top: pos.top,
                    left: pos.left,
                    opacity: pos.opacity
                  }}
                />

                {/* Header: tricolor stripe + emblem + ministry info */}
                <div className="relative z-10">
                  <div className="w-full h-1 flex rounded-t-lg overflow-hidden">
                    <div className="flex-1 bg-orange-500"></div>
                    <div className="flex-1 bg-white"></div>
                    <div className="flex-1 bg-green-600"></div>
                  </div>

                  <div className="flex items-center bg-[#0B3B60] text-white px-4 py-2 gap-2 justify-center">
                    <img
                      src="/assets/emblem.png"
                      alt="Emblem of India"
                      className="w-6 h-6"
                    />
                    <span className="text-sm md:text-base font-semibold text-center">
                      Government of India | Ministry of Labour & Employment
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col h-full relative z-10 space-y-4">
                  <h3 className="text-lg md:text-xl font-bold text-[#0B3B60] border-b border-gray-200 pb-1 text-center">
                    {res.title}
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-gray-800 font-medium">
                    <Code size={18} className="text-[#0B3B60]" />
                    <span>Code:</span>
                    <span className="font-mono">{res.nco_code}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-gray-700 font-medium">
                    <BarChart2 size={18} className="text-[#0B3B60]" />
                    <span>Score:</span>
                    <span>{res.score.toFixed(4)}</span>
                  </div>

                  {res.description && (
                    <div className="flex gap-2 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      <AlignLeft size={18} className="text-[#0B3B60] mt-1" />
                      <div>
                        <span className="font-semibold">Description:</span>
                        <p className="mt-1 text-justify">{res.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600 mt-4 text-center font-medium">
          No results found.
        </p>
      )}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default ResultsList;
