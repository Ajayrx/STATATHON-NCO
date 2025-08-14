import React, { useEffect, useRef, useState } from "react";
import { Search as SearchIcon, Mic, MicOff } from "lucide-react";
import axios from "axios";

function SearchBox({ placeholder = "Try: Electrical Engineer, Data Analyst..." }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef();

  const API_BASE = import.meta.env.VITE_API_URL; // ✅ Deployed backend

  // Auto-focus input
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Voice Recognition Setup
  const recognitionRef = useRef(null);
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleSearch(transcript);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const handleVoiceInput = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      if (isListening) {
        recognitionRef.current?.stop();
      } else {
        setIsListening(true);
        recognitionRef.current?.start();
      }
    } catch {
      alert("Please allow microphone access in your browser settings.");
    }
  };

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/search`, {
        params: { query: searchQuery },
      });
      setResults(res.data.results || []);
    } catch (err) {
      console.error("Search error:", err);
      alert("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full relative">
        <div className="relative flex-1">
          <SearchIcon
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B3B60] focus:border-[#0B3B60] transition placeholder-gray-400 bg-white"
            placeholder={placeholder}
            disabled={loading}
          />
          <button
            type="button"
            onClick={handleVoiceInput}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#0B3B60] transition z-10"
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff size={20} className="text-red-500" /> : <Mic size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className={`px-5 py-3 rounded-md text-white font-semibold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0B3B60] hover:bg-[#092d48] shadow-md"
          }`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results */}
      <div className="mt-5">
        {results.length > 0 ? (
          <ul className="space-y-2">
            {results.map((item, idx) => (
              <li key={idx} className="p-3 border rounded-md shadow-sm bg-white">
                <strong>{item.job_title}</strong> — {item.nco_code}
              </li>
            ))}
          </ul>
        ) : (
          loading ? null : <p className="text-gray-500 mt-2">No results yet.</p>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
