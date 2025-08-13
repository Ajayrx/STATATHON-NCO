import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, FileText } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* Header */}
      <header className="w-full bg-[#0B3B60] shadow-md">
        <div className="w-full h-1 flex">
          <div className="flex-1 bg-orange-500"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-green-600"></div>
        </div>
        <div className="text-center py-6 text-white">
          <img
            src="/assets/emblem.png"
            alt="Emblem of India"
            className="mx-auto h-16 w-auto mb-2"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Disclaimer
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-200">
            Smart NCO Search Portal — Government of India
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 px-6">
        <p className="text-sm text-gray-700">Home &gt; Disclaimer</p>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 text-gray-800 flex flex-col gap-12">

        {/* Purpose Section */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-bold text-[#0B3B60] flex items-center gap-2">
            <FileText size={24} /> Purpose of Disclaimer
          </h2>
          <p className="leading-relaxed text-gray-700">
            The Smart NCO Search Portal provides information for reference purposes only. Maintained by the Ministry of Labour & Employment, Government of India, it assists users in identifying appropriate NCO-2015 occupational codes.
          </p>
        </section>

        {/* Liability Section */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-bold text-[#0B3B60] flex items-center gap-2">
            <AlertTriangle size={24} /> Liability
          </h2>
          <p className="leading-relaxed text-gray-700">
            All reasonable efforts are made to ensure accuracy, but the Government of India does not guarantee completeness, correctness, or reliability. Users must verify details from official sources before using them for legal, professional, or official purposes.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-bold text-[#0B3B60]">User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Verify NCO codes with official records before use.</li>
            <li>Do not rely solely on the portal for legal or administrative decisions.</li>
            <li>Respect intellectual property and usage terms of the portal.</li>
            <li>Report discrepancies or errors to <a href="mailto:info@nco.gov.in" className="underline text-[#0B3B60] hover:text-[#092d48]">info@nco.gov.in</a>.</li>
          </ul>
        </section>

        {/* Resources */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-bold text-[#0B3B60]">Resources</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <a href="/assets/disclaimer.pdf" download className="underline text-[#0B3B60] hover:text-[#092d48] transition-colors">
                Official Disclaimer (PDF)
              </a>
            </li>
            <li>
              <a href="/assets/nco_guidelines.pdf" download className="underline text-[#0B3B60] hover:text-[#092d48] transition-colors">
                NCO-2015 Guidelines (PDF)
              </a>
            </li>
          </ul>
        </section>

        {/* Quick Actions */}
        <section className="flex flex-col md:flex-row gap-4 mt-4">
          <Link
            to="/"
            className="inline-block bg-[#0B3B60] text-white px-6 py-2 rounded-md font-medium hover:bg-[#092d48] shadow-md transition-shadow text-center"
          >
            Back to Home
          </Link>
          <a
            href="mailto:info@nco.gov.in"
            className="inline-block bg-[#0B3B60] text-white px-6 py-2 rounded-md font-medium hover:bg-[#092d48] shadow-md transition-shadow text-center"
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
