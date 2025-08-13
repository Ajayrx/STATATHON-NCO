import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
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
          <img src="/assets/emblem.png" alt="Emblem of India" className="mx-auto h-16 w-auto mb-2" />
          <h1 className="text-3xl md:text-4xl font-bold">Contact Information</h1>
          <p className="mt-2 text-sm md:text-base text-gray-200">
            Ministry of Labour & Employment — Government of India
          </p>
        </div>
      </header>

      {/* Breadcrumb / Navigation */}
      <div className="bg-gray-100 py-3 px-6">
        <p className="text-sm text-gray-700">
          Home &gt; Contact
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 text-gray-800 flex flex-col gap-12">

        {/* Ministry Contact Details */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-[#0B3B60]">Ministry Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <MapPin size={28} className="text-[#0B3B60]" />
              <div>
                <p><strong>Address:</strong></p>
                <p>Shram Shakti Bhawan, Rafi Marg, New Delhi - 110001, India</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={28} className="text-[#0B3B60]" />
              <div>
                <p><strong>Phone:</strong> +91 11 2371 2221</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={28} className="text-[#0B3B60]" />
              <div>
                <p><strong>Email:</strong> <a href="mailto:info@nco.gov.in" className="underline text-[#0B3B60] hover:text-[#092d48]">info@nco.gov.in</a></p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={28} className="text-[#0B3B60]" />
              <div>
                <p><strong>Office Hours:</strong></p>
                <p>Monday - Friday: 09:30 AM - 06:00 PM (IST)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Google Map Embed */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6">
          <h2 className="text-2xl font-semibold text-[#0B3B60] mb-4">Location Map</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              title="Shram Shakti Bhawan Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.973066315886!2d77.2181892750529!3d28.63156868242075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce42d0c1f9f23%3A0x69b8f5ffb7e51ef6!2sShram%20Shakti%20Bhawan!5e0!3m2!1sen!2sin!4v1691916487285!5m2!1sen!2sin"
              className="w-full h-64 md:h-96 rounded-md border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        {/* Resources / Downloads */}
        <section className="bg-white shadow-md border border-gray-200 rounded-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#0B3B60]">Resources</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a href="/assets/contact_details.pdf" download className="underline text-[#0B3B60] hover:text-[#092d48]">
                Download Official Contact Details (PDF)
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
            Send Email
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
