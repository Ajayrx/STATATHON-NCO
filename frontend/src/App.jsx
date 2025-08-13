import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import AdminPanel from "./components/AdminPanel";
import SearchLogPage from "./pages/SearchLogPage";  // import new page
import { Building2, Search, Shield } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
      location.pathname === path
        ? "bg-primary text-primary-content shadow-lg"
        : "hover:bg-primary hover:text-primary-content"
    }`;

  return (
    <div className="bg-base-100 shadow sticky top-0 z-50 w-full">
      <nav className="max-w-6xl mx-auto px-6 md:px-0 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Building2 size={28} className="text-primary" />
          <Link to="/" className="text-2xl font-bold text-primary select-none">
            Smart NCO Search
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4">
          <Link to="/" className={linkClass("/")}>
            <Search size={18} />
            Search
          </Link>
          <Link to="/search-logs" className={linkClass("/search-logs")}>
            {/* You can add an icon here if you want, e.g. ClipboardList */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M7 17h10M7 17a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Search Logs
          </Link>
          <Link to="/admin" className={linkClass("/admin")}>
            <Shield size={18} />
            Admin Panel
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost text-lg px-3 py-2">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-56"
          >
            <li>
              <Link to="/" className={linkClass("/")}>
                <Search size={18} />
                Search
              </Link>
            </li>
            <li>
              <Link to="/search-logs" className={linkClass("/search-logs")}>
                {/* Same icon as desktop */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M7 17h10M7 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Search Logs
              </Link>
            </li>
            <li>
              <Link to="/admin" className={linkClass("/admin")}>
                <Shield size={18} />
                Admin Panel
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen w-full bg-blue-100">
      <Navbar />
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 md:px-0 mt-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/search-logs" element={<SearchLogPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
