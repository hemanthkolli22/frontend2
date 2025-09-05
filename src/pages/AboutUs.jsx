import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AboutUs() {
  const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    
    
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  
  ];

  const sliderRef = useRef();

  const scroll = (direction) => {
    if (direction === "left") {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">

      {/* Hero Section */}
      <section className="bg-[#003366] text-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">About Job Finder</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Your trusted career partner helping professionals find the right opportunities and companies discover the best talent.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#FF6600] mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Job Finder is India’s leading platform connecting job seekers with verified employers across industries.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With our user-friendly platform, professionals can search, apply, and track applications seamlessly, while companies find the right talent efficiently.
          </p>
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-vector/recruitment-agency-hiring-new-employees_74855-4565.jpg"
            alt="Team"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold text-[#FF6600] mb-3">Our Mission</h3>
          <p className="text-gray-700">
            To empower individuals with meaningful career opportunities and assist companies in hiring the best talent efficiently.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold text-[#FF6600] mb-3">Our Vision</h3>
          <p className="text-gray-700">
            To become India’s most trusted and innovative career platform where talent meets opportunity.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-[#FF6600] mb-12">Why Choose Job Finder?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Verified Companies</h3>
            <p className="text-gray-700 text-sm">All job listings are from genuine, verified employers you can trust.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Smart Job Search</h3>
            <p className="text-gray-700 text-sm">Filter and discover jobs tailored to your skills and experience efficiently.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Career Growth</h3>
            <p className="text-gray-700 text-sm">Access resources, guidance, and opportunities to grow professionally.</p>
          </div>
        </div>
      </section>

      {/* Top Companies Slider */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#FF6600] text-center mb-12">Top Companies Hiring</h2>
          
          {/* Slider */}
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800"/>
            </button>
            <div ref={sliderRef} className="flex space-x-6 overflow-x-auto scrollbar-hide py-4">
              {companies.map((company) => (
                <div
                  key={company.name}
                  className="flex-none w-36 h-20 bg-white p-4 rounded-xl shadow hover:shadow-md flex items-center justify-center transition"
                >
                  <img src={company.logo} alt={company.name} className="h-10 object-contain"/>
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-800"/>
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#003366] text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Start Your Career Journey Today</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Join Job Finder to explore thousands of jobs and connect with top companies across India.
        </p>
        <Link
          to="/jobs"
          className="bg-[#FF6600] text-white px-6 py-3 rounded-xl font-medium shadow hover:bg-orange-500 transition inline-block"
        >
          Explore Jobs
        </Link>
      </section>
    </div>
  );
}
