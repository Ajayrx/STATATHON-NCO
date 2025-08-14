import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Search, Shield } from "lucide-react";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Disclaimer from "./pages/Disclaimer";
import Privacy from "./pages/Privacy";
import AdminPanel from "./components/AdminPanel";
import SearchLogPage from "./pages/SearchLogPage";

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (path) =>
    `relative flex items-center gap-2 px-4 py-2 rounded text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
      location.pathname === path
        ? "text-white bg-[#0B3B60] shadow-md"
        : "text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:via-white hover:to-green-600"
    }`;

  return (
    <div className={`w-full sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""}`}>
      {/* Tricolor top stripe */}
      <div className="w-full h-1 flex">
        <div className="flex-1 bg-orange-500 transition-all duration-500 hover:flex-[2]"></div>
        <div className="flex-1 bg-white transition-all duration-500 hover:flex-[0.5]"></div>
        <div className="flex-1 bg-green-600 transition-all duration-500 hover:flex-[2]"></div>
      </div>

      {/* Navbar content */}
      <nav className="bg-gradient-to-r from-[#f5f7fa] via-[#eaf0fa] to-[#f5f7fa] border-b border-gray-300 font-serif transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 md:px-0 flex items-center justify-between h-20">
          {/* Logo + Official Header */}
          <div className="flex items-center gap-4 wave-group">
            <img
              src="/assets/emblem.png"
              alt="Emblem of India"
              className="h-12 w-auto transform transition-transform duration-300 hover:scale-110 hover:rotate-3 animate-wave"
            />
            <div className="flex flex-col leading-tight animate-wave">
              <span className="text-sm font-semibold text-gray-700 uppercase select-none tracking-widest">
                Government of India
              </span>
              <Link
                to="/"
                className="text-2xl md:text-3xl font-extrabold text-[#0B3B60] uppercase select-none tracking-wider border-b-2 border-[#0B3B60] pb-1 hover:text-[#0A2F50] transition-colors duration-300"
              >
               NCO SEARCH PORTAL
              </Link>
              <div className="w-16 h-0.5 bg-[#0B3B60] mt-1 rounded"></div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4">
            {[
              { path: "/", label: "Search", icon: <Search size={16} /> },
              { path: "/search-logs", label: "Search Logs" },
              { path: "/admin", label: "Admin", icon: <Shield size={16} /> },
            ].map((item) => (
              <Link key={item.path} to={item.path} className={linkClass(item.path)}>
                {item.icon && item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost text-lg px-3 py-2 border rounded">
              ☰
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-56 space-y-2">
              {[
                { path: "/", label: "Search", icon: <Search size={16} /> },
                { path: "/search-logs", label: "Search Logs" },
                { path: "/admin", label: "Admin", icon: <Shield size={16} /> },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={linkClass(item.path)}>
                    {item.icon && item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

// Tricolor wave animation keyframes
const WaveAnimation = () => (
  <style>{`
    @keyframes wave {
      0% { background-position: 0% 0; }
      50% { background-position: 100% 0; }
      100% { background-position: 0% 0; }
    }
    .animate-wave {
      animation: wave 2s linear infinite;
    }
  `}</style>
);

function AppContent() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <WaveAnimation />
      <Navbar />
      <main className="flex-grow w-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Admin & Logs */}
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/search-logs" element={<SearchLogPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
