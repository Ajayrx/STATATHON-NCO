import React, { useEffect, useRef, useState } from "react";  
import { Search as SearchIcon, Mic, MicOff } from "lucide-react";

function SearchBox({ onSearch, loading, placeholder = "Try: Electrical Engineer, Data Analyst..." }) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef();

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
        onSearch(transcript);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, [onSearch]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full relative">
      <div className="relative flex-1">
        {/* Search Icon */}
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
        {/* Voice Button */}
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
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#0B3B60] hover:bg-[#092d48] shadow-md"
        }`}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBox;
