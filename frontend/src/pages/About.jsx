import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (index) => setFaqOpen(faqOpen === index ? null : index);

  const faqs = [
    {
      question: "What is NCO-2015?",
      answer:
        "NCO-2015 is the National Classification of Occupations, which provides standardized codes for all professions in India.",
    },
    {
      question: "Who maintains this portal?",
      answer:
        "This portal is maintained by the Ministry of Labour & Employment, Government of India.",
    },
    {
      question: "Can I use this for official reporting?",
      answer:
        "Yes, the classifications here are authorized for use in official employment and statistical reporting.",
    },
    {
      question: "How frequently is the data updated?",
      answer:
        "The data is reviewed and updated periodically by the Ministry to ensure accuracy and compliance with official standards.",
    },
    {
      question: "Is this portal free to use?",
      answer:
        "Yes, the Smart NCO Search Portal is completely free and publicly accessible for citizens and organizations.",
    },
    {
      question: "Can I suggest changes or corrections?",
      answer:
        "Users can provide feedback through the official contact email provided on the Contact page. Suggestions are reviewed by the Ministry.",
    },
    {
      question: "Are there any restrictions on using the data?",
      answer:
        "Data can be used for official, educational, and research purposes. Unauthorized commercial use is not permitted without approval.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* Header */}
      <motion.header
        className="w-full bg-[#0B3B60] shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
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
            Smart NCO Search Portal
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-200">
            An official Government of India initiative — Ministry of Labour & Employment
          </p>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 text-gray-800 flex flex-col gap-12">

        {/* Purpose */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-bold text-[#0B3B60]">Purpose of the Portal</h2>
          <p className="leading-relaxed text-gray-700">
            The Smart NCO Search Portal is an official government initiative designed to help users identify the appropriate NCO-2015 occupational codes for any profession in India.
          </p>
          <p className="leading-relaxed text-gray-700">
            It provides a reliable, standardized way to classify occupations for use in employment, reporting, and official statistics.
          </p>
          <p className="leading-relaxed text-gray-700">
            All content is authorized by the Ministry of Labour & Employment and follows government data and compliance standards.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md border border-gray-200 rounded-md p-6">
            <h2 className="text-xl font-semibold text-[#0B3B60]">Mission</h2>
            <p className="text-gray-700 mt-2">
              To provide a reliable, standardized system for identifying and classifying occupations in India.
            </p>
          </div>
          <div className="bg-white shadow-md border border-gray-200 rounded-md p-6">
            <h2 className="text-xl font-semibold text-[#0B3B60]">Vision</h2>
            <p className="text-gray-700 mt-2">
              To empower citizens and organizations with accurate occupational data for planning, employment, and policy-making.
            </p>
          </div>
        </section>

        {/* Guidelines */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-bold text-[#0B3B60]">Usage Guidelines</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Search for standardized NCO-2015 occupational codes only.</li>
            <li>Ensure all references comply with official reporting requirements.</li>
            <li>Refer to Ministry guidelines for proper classification and interpretation.</li>
          </ul>
        </section>

        {/* FAQs */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6">
          <h2 className="text-2xl font-bold text-[#0B3B60] mb-4">Frequently Asked Questions</h2>
          <div className="flex flex-col divide-y divide-gray-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-2">
                <button
                  className="w-full text-left font-medium flex justify-between items-center hover:text-[#0B3B60]"
                  onClick={() => toggleFaq(idx)}
                >
                  {faq.question}
                  <span className="ml-2">{faqOpen === idx ? "−" : "+"}</span>
                </button>
                {faqOpen === idx && <p className="mt-2 text-gray-700">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-bold text-[#0B3B60]">Downloadable Resources</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <a
                href="/assets/nco2015.pdf"
                download
                className="text-[#0B3B60] underline hover:text-[#092d48] transition-colors"
              >
                NCO-2015 Official PDF
              </a>
            </li>
            <li>
              <a
                href="/assets/nco_guidelines.pdf"
                download
                className="text-[#0B3B60] underline hover:text-[#092d48] transition-colors"
              >
                NCO Usage Guidelines
              </a>
            </li>
          </ul>
        </section>

        {/* Back Button */}
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-[#0B3B60] text-white px-6 py-2 rounded-md font-medium hover:bg-[#092d48] shadow-md transition-shadow"
          >
            Back to Home
          </Link>
        </div>
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
