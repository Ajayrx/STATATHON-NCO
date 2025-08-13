import React from "react";
import { Link } from "react-router-dom";
import { Shield, FileText } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* Header */}
      <header className="w-full bg-[#0B3B60] shadow-md">
        {/* Tricolor top strip */}
        <div className="w-full h-1 flex">
          <div className="flex-1 bg-orange-500"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-green-600"></div>
        </div>
        <div className="text-center py-6 text-white">
          <img src="/assets/emblem.png" alt="Emblem of India" className="mx-auto h-16 w-auto mb-2" />
          <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-sm md:text-base text-gray-200">
            Smart NCO Search Portal — Government of India
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 px-6">
        <p className="text-sm text-gray-700">Home &gt; Privacy Policy</p>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 text-gray-800 flex flex-col gap-12">

        {/* Purpose Section */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#0B3B60] flex items-center gap-2">
            <Shield size={24} /> Purpose
          </h2>
          <p className="leading-relaxed">
            The Smart NCO Search Portal respects the privacy of its users. Any personal information collected during the use of this portal is handled in accordance with Government of India privacy guidelines and applicable laws.
          </p>
          <p className="leading-relaxed">
            This policy ensures transparency in how search data, queries, and user interactions are stored, processed, and protected.
          </p>
        </section>

        {/* Data Collection */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#0B3B60]">Data Collection</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>No personally identifiable information is collected unless voluntarily provided.</li>
            <li>Search queries may be logged anonymously for statistical and reporting purposes.</li>
            <li>All data collection complies with applicable government data protection regulations.</li>
          </ul>
        </section>

        {/* Data Usage */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#0B3B60]">Usage of Information</h2>
          <p className="leading-relaxed">
            We do not share your search data with any third party, except as required for official reporting and analysis by the Ministry of Labour & Employment.
          </p>
          <p className="leading-relaxed">
            Data is securely stored and only accessible to authorized personnel for government reporting and statistical analysis.
          </p>
        </section>

        {/* User Rights */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#0B3B60]">User Rights</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Users can request information on the data stored about their usage.</li>
            <li>Users may contact the portal administration to correct inaccurate or incomplete data.</li>
            <li>All privacy requests are handled in accordance with government standards and timelines.</li>
          </ul>
        </section>

        {/* Resources / Downloads */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#0B3B60] flex items-center gap-2">
            <FileText size={24} /> Resources
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a href="/assets/privacy_policy.pdf" download className="underline text-[#0B3B60] hover:text-[#092d48]">
                Download Official Privacy Policy (PDF)
              </a>
            </li>
            <li>
              <a href="/assets/nco_guidelines.pdf" download className="underline text-[#0B3B60] hover:text-[#092d48]">
                NCO-2015 Guidelines (PDF)
              </a>
            </li>
          </ul>
        </section>

        {/* Quick Actions */}
        <section className="flex flex-col md:flex-row gap-4 mt-4">
          <Link
            to="/"
            className="inline-block bg-[#0B3B60] text-white px-6 py-2 rounded-md font-medium hover:bg-[#092d48] transition-shadow shadow-md text-center"
          >
            Back to Home
          </Link>
          <a
            href="mailto:info@nco.gov.in"
            className="inline-block bg-[#0B3B60] text-white px-6 py-2 rounded-md font-medium hover:bg-[#092d48] transition-shadow shadow-md text-center"
          >
            Contact Ministry
          </a>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#0B3B60] text-gray-200 mt-auto w-full">
        <div className="w-full h-1 flex">
          <div className="flex-1 bg-orange-500"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-green-600"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm">
          © {new Date().getFullYear()} Smart NCO Search — Government of India Initiative
        </div>
      </footer>

    </div>
  );
}
