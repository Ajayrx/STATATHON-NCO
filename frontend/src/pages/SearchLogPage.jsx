import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api"; // centralized backend URL

export default function SearchLogPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLogs() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${API_BASE_URL}/api/v1/admin/search-logs`);
        setLogs(res.data);
      } catch (err) {
        setError(
          "Unable to retrieve search logs at this time. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  return (
    <section className="relative min-h-screen bg-gray-50 py-12 px-6 md:px-0 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg border border-gray-200 p-0 relative z-10">

        {/* Header */}
        <header className="text-center relative z-10">
          {/* Tricolor Top Stripe */}
          <div className="flex w-full h-2">
            <div className="flex-1 bg-orange-500"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-green-600"></div>
          </div>

          {/* Emblem and Title */}
          <div className="flex flex-col items-center py-6 border-b border-gray-300">
            <img
              src="/assets/emblem.png"
              alt="National Emblem of India"
              className="h-20 w-auto mb-3"
            />
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B3B60] tracking-wide">
              Search Logs Portal
            </h1>
            <p className="text-gray-700 mt-2 text-base md:text-lg max-w-2xl">
              Official record of all NCO-2015 occupational code search queries
            </p>
            <span className="mt-2 inline-block bg-[#0B3B60] text-white text-sm px-3 py-1 rounded-full font-semibold">
              Government of India | Ministry of Labour & Employment
            </span>
          </div>
        </header>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center py-10 text-[#0B3B60]">
            <svg
              className="animate-spin h-10 w-10 text-[#0B3B60]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {/* No Logs */}
        {!loading && !error && logs.length === 0 && (
          <p className="text-center text-gray-600 text-lg">
            No search records available at the moment.
          </p>
        )}

        {/* Logs Cards */}
        {!loading && !error && logs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4 md:px-0">
            {logs.map(({ id, query, timestamp, category }, idx) => (
              <div
                key={id}
                className="bg-white rounded-lg shadow hover:shadow-lg border border-gray-200 p-5 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500 font-mono">#{idx + 1}</span>
                    <span className="text-xs bg-[#0B3B60] text-white px-2 py-1 rounded-full font-semibold">
                      {new Date(timestamp).toLocaleString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm md:text-base">{query}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    Reference ID: {id}
                  </span>
                  {category && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
