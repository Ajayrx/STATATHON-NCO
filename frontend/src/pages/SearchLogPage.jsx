import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SearchLogPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLogs() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("http://localhost:8000/api/v1/admin/search-logs");
        setLogs(res.data);
      } catch (err) {
        setError("Failed to load search logs. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  return (
    <section className="max-w-5xl mx-auto p-6">
      <header>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Search Logs</h1>
      </header>

      {loading && (
        <div
          role="status"
          aria-live="polite"
          className="flex justify-center items-center py-10 text-indigo-600"
        >
          <svg
            className="animate-spin h-10 w-10 text-indigo-600"
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
          <span className="sr-only">Loading search logs...</span>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
        >
          {error}
        </div>
      )}

      {!loading && !error && logs.length === 0 && (
        <p className="text-center text-gray-600 text-lg">No search logs found.</p>
      )}

      {!loading && !error && logs.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-100 sticky top-0">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider"
                >
                  Query
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider"
                >
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {logs.map(({ id, query, timestamp }, idx) => (
                <tr
                  key={id}
                  className={idx % 2 === 0 ? "bg-indigo-50" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono text-center">{id}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-800">{query}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(timestamp).toLocaleString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
