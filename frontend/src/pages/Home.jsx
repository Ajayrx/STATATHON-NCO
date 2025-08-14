import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import ResultsList from "../components/ResultsList";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Home() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [chakraStyle] = useState({
    top: "12%",
    left: "35%",
    width: "28rem",
    opacity: 0.15,
  });

  const handleSearch = async (query) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/search/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden font-sans bg-white">
      {/* Decorative Vine Patterns */}
      <img
        src="/assets/vine_bg.png"
        alt="Decorative Indian vine pattern"
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          top: "10px",
          left: "0px",
          width: "300px",
          height: "auto",
          opacity: 0.18,
          zIndex: 0,
        }}
      />

      <img
        src="/assets/vine_bg.png"
        alt="Decorative Indian vine pattern"
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          top: "10px",
          right: "0px",
          width: "300px",
          height: "auto",
          opacity: 0.18,
          transform: "scaleX(-1)",
          zIndex: 0,
        }}
      />

      {/* Bottom Left Vine (mirrored vertically) */}
      <img
        src="/assets/vine_bg.png"
        alt="Decorative Indian vine pattern"
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          bottom: "10px",
          left: "0px",
          width: "300px",
          height: "auto",
          opacity: 0.08,
          transform: "scaleY(-1)",
          zIndex: 0,
        }}
      />

      {/* Bottom Right Vine (mirrored both ways) */}
      <img
        src="/assets/vine_bg.png"
        alt="Decorative Indian vine pattern"
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          bottom: "10px",
          right: "0px",
          width: "300px",
          height: "auto",
          opacity: 0.08,
          transform: "scale(-1, -1)",
          zIndex: 0,
        }}
      />

      {/* Rotating Ashoka Chakra */}
      <img
        src="/assets/ashoka_chakra.png"
        alt="Ashoka Chakra emblem watermark"
        style={chakraStyle}
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none animate-spin-slow z-0"
      />

      {/* Hero Section */}
      <section className="relative flex-grow z-10 flex flex-col items-center text-center py-12 px-6 md:px-0 max-w-5xl mx-auto gap-6">
        <motion.img
          src="/assets/emblem.png"
          alt="National Emblem of India"
          className="h-20 w-auto mb-4 md:h-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        />

        <motion.div
          className="max-w-3xl flex flex-col items-center space-y-2"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <p className="text-sm md:text-base font-semibold text-gray-700 uppercase tracking-widest">
            Government of India
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0B3B60] tracking-tight leading-snug">
            NCO Search Portal
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl leading-relaxed">
            National Classification of Occupations – 2015. Official portal to
            identify the appropriate NCO-2015 occupational code for any
            profession.
          </p>
          <Link
            to="/search-logs"
            className="mt-3 inline-block bg-[#0B3B60] text-white px-8 py-3 rounded-md font-medium hover:bg-[#092d48] transition-transform transform hover:scale-105 shadow-md"
          >
            Access Search Logs
          </Link>
        </motion.div>

        {/* Search Section */}
        <motion.div
          className="w-full max-w-5xl bg-white border-l-4 border-[#0B3B60] shadow-lg rounded-md p-8 mt-6 flex flex-col items-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-full h-1 flex mb-4 rounded">
            <div className="flex-1 bg-[#FF9933]"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-[#138808]"></div>
          </div>
          <SearchBox
            onSearch={handleSearch}
            loading={loading}
            placeholder="Enter occupation: e.g., Electrical Engineer, Data Analyst, School Teacher"
            aria-label="Occupation search input"
            className="w-full max-w-3xl"
          />
          <ResultsList
            results={results}
            hasSearched={hasSearched}
            loading={loading}
            noResultsMessage="No matching occupation found. Please refine your search."
            className="w-full max-w-3xl"
          />
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className="bg-[#0B3B60] text-gray-200 mt-auto w-full relative z-10 font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="w-full h-1 flex">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#138808]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-300">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src="/assets/emblem.png" alt="Emblem of India" className="w-16" />
            <h2 className="text-xl font-semibold text-white">Smart NCO Search Portal</h2>
            <p className="text-sm text-gray-300">
              A government-authorized tool for occupational classification under NCO-2015.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><Link to="/about" className="hover:underline hover:text-white">About the Portal</Link></li>
              <li><Link to="/contact" className="hover:underline hover:text-white">Contact Information</Link></li>
              <li><Link to="/disclaimer" className="hover:underline hover:text-white">Disclaimer</Link></li>
              <li><Link to="/privacy" className="hover:underline hover:text-white">Privacy Policy</Link></li>
              <li><a href="https://labour.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white">Ministry of Labour & Employment</a></li>
            </ul>
          </div>
          <div className="space-y-2 text-sm text-gray-200">
            <h3 className="text-lg font-semibold mb-3 text-white">Contact Details</h3>
            <p>Ministry of Labour & Employment</p>
            <p>Shram Shakti Bhawan, Rafi Marg</p>
            <p>New Delhi - 110001, India</p>
            <p>Phone: +91 11 2371 2221</p>
            <p>Email: <Link to="mailto:info@nco.gov.in" className="hover:underline hover:text-white">info@nco.gov.in</Link></p>
          </div>
        </div>
        <div className="bg-[#072F4A] py-4 mt-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <span>© {new Date().getFullYear()} Smart NCO Search — Government of India Initiative</span>
            <span>Visit: <a href="https://www.india.gov.in/" className="hover:underline hover:text-white">www.india.gov.in</a></span>
          </div>
        </div>
      </motion.footer>

      {/* Chakra spin animation */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;
