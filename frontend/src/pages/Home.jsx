import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import ResultsList from "../components/ResultsList";
import {
  Search,
  Heart,
  Code,
  MapPin,
  Phone,
  Mail,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const bounceAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: { repeat: Infinity, repeatType: "loop", duration: 2, ease: "easeInOut" },
  },
};

function Home() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen w-full bg-gradient-to-tr from-indigo-50 via-white to-indigo-100 flex flex-col">
      <section className="hero flex-grow py-12 px-6 md:px-0 max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
        <motion.div
          className="max-w-3xl flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div {...bounceAnimation} className="mb-4">
            <Search
              size={64}
              className="text-indigo-600 drop-shadow-lg"
              aria-label="Search Icon"
            />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-indigo-900 leading-tight drop-shadow-md">
            Smart NCO Search
          </h1>
          <p className="text-xl md:text-3xl font-semibold text-indigo-700 opacity-90 mt-2 mb-6 max-w-xl">
            2015 Job Code Lookup
          </p>
          <p className="text-md md:text-lg max-w-lg leading-relaxed text-indigo-800 opacity-90">
            Quickly find the correct NCO-2015 job code for your profession.
            Type your job role and instantly get matching titles, codes, and descriptions.
          </p>

          <Link
            to="/search-logs"
            className="mt-6 inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
            aria-label="View Search Logs"
          >
            View Search Logs
          </Link>
        </motion.div>

        <motion.div
          className="card w-full max-w-5xl bg-white shadow-lg rounded-3xl p-10 mt-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SearchBox
            onSearch={handleSearch}
            loading={loading}
            placeholder="Try: Electrical Engineer, Data Analyst, Teacher..."
            clearable={true}
          />
          <ResultsList
            results={results}
            hasSearched={hasSearched}
            loading={loading}
            noResultsMessage="No matching jobs found. Please try different keywords."
          />
        </motion.div>
      </section>

      <motion.footer
        className="bg-gray-900 text-gray-200 py-10 px-6 mt-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start max-w-xs mx-auto md:mx-0">
            <h2 className="text-2xl font-bold mb-3">Smart NCO Search</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Empowering citizens with accurate job code data from the National Classification of Occupations (NCO).
            </p>
          </div>

          <div className="flex justify-center gap-8 text-3xl text-gray-400">
            <a
              href="https://twitter.com/india"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-blue-400 transition"
              title="Twitter"
            >
              <Twitter />
            </a>
            <a
              href="https://facebook.com/india"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-600 transition"
              title="Facebook"
            >
              <Facebook />
            </a>
            <a
              href="https://linkedin.com/company/india"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-700 transition"
              title="LinkedIn"
            >
              <Linkedin />
            </a>
          </div>

          <address className="not-italic space-y-2 leading-tight text-gray-400 max-w-xs mx-auto md:mx-0">
            <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
            <p className="flex items-center gap-2 justify-center md:justify-start">
              <MapPin size={16} />
              Ministry of Labour & Employment
            </p>
            <p className="flex items-center gap-2 justify-center md:justify-start">
              <MapPin size={16} />
              Shram Shakti Bhawan, Rafi Marg
            </p>
            <p className="flex items-center gap-2 justify-center md:justify-start">
              New Delhi - 110001, India
            </p>
            <p className="flex items-center gap-2 justify-center md:justify-start">
              <Phone size={16} />
              +91 11 2371 2221
            </p>
            <p className="flex items-center gap-2 justify-center md:justify-start">
              <Mail size={16} />
              <a
                href="mailto:info@nco.gov.in"
                className="hover:underline"
                aria-label="Email address"
              >
                info@nco.gov.in
              </a>
            </p>
          </address>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto text-xs text-gray-500">
          <span className="text-center md:text-left">
            © {new Date().getFullYear()} Smart NCO Search — Built with{" "}
            <Heart size={14} className="inline text-red-500 mx-1" /> React, FastAPI & FAISS
          </span>
          <span className="flex items-center gap-2 mt-2 md:mt-0 justify-center md:justify-start">
            <Code size={16} className="text-indigo-600" />
            <a
              href="https://www.india.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Official Govt. Portal
            </a>
          </span>
        </div>
      </motion.footer>
    </div>
  );
}

export default Home;
