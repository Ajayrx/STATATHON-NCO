import React, { useEffect, useState } from "react";
import { PlusCircle, Trash2, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function AdminPanel() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ nco_code: "", title: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const fetchJobs = async () => {
    try {
      setError(null);
      const res = await fetch("http://localhost:8000/api/v1/admin");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nco_code.trim() || !form.title.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/v1/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to add job");
      }
      setForm({ nco_code: "", title: "" });
      setSuccessMsg("Job added successfully!");
      fetchJobs();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/v1/admin/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete job");
      setSuccessMsg("Job deleted successfully!");
      fetchJobs();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <header className="flex items-center gap-3 mb-8">
          <ClipboardList size={36} className="text-blue-700" />
          <h1 className="text-3xl font-extrabold text-gray-900">
            Admin Panel — Manage Job Codes
          </h1>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-4 p-3 rounded border border-red-400 bg-red-100 text-red-700"
          >
            {error}
          </div>
        )}
        {successMsg && (
          <div
            role="alert"
            className="mb-4 p-3 rounded border border-green-400 bg-green-100 text-green-700"
          >
            {successMsg}
          </div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="mb-10 space-y-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="NCO Code"
              value={form.nco_code}
              onChange={(e) => setForm({ ...form, nco_code: e.target.value })}
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
              aria-label="NCO Code"
            />
            <input
              type="text"
              placeholder="Job Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
              aria-label="Job Title"
            />
          </div>
          <button
            type="submit"
            className={`inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 focus:ring-4 focus:ring-blue-400 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            aria-disabled={loading}
          >
            <PlusCircle size={20} />
            {loading ? "Adding..." : "Add Job"}
          </button>
        </motion.form>

        <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-blue-100 sticky top-0">
              <tr>
                <th className="border border-gray-300 px-5 py-3 text-left font-semibold text-blue-800">
                  NCO Code
                </th>
                <th className="border border-gray-300 px-5 py-3 text-left font-semibold text-blue-800">
                  Title
                </th>
                <th className="border border-gray-300 px-5 py-3 text-center font-semibold text-blue-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="border border-gray-300 px-5 py-6 text-center text-gray-500"
                  >
                    No job codes available.
                  </td>
                </tr>
              ) : (
                jobs.map((job, idx) => (
                  <motion.tr
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`hover:bg-blue-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                    }`}
                  >
                    <td className="border border-gray-300 px-5 py-3 font-mono text-gray-900">
                      {job.nco_code}
                    </td>
                    <td className="border border-gray-300 px-5 py-3 text-gray-800">
                      {job.title}
                    </td>
                    <td className="border border-gray-300 px-5 py-3 text-center">
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                        aria-label={`Delete job code ${job.nco_code}`}
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
