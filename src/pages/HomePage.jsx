import React from "react";
import { Link } from "react-router-dom";

const jobCategories = [
  "Software Development",
  "Marketing",
  "Design",
  "Sales",
  "HR",
  "Finance",
];

const topCompanies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" },
];

const HomePage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-100 font-sans">

      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="mb-8 text-lg md:text-xl text-gray-200">
            Browse thousands of job opportunities from top companies across India.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Job title, skills, or company"
              className="w-full md:w-2/3 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full md:w-1/3 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
            />
            <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Job Categories</h2>
          <p className="text-gray-600">Explore jobs by your preferred fields</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {jobCategories.map((cat) => (
            <Link
              key={cat}
              to="/jobs"
              className="bg-white shadow-lg rounded-lg py-6 hover:shadow-xl transition duration-300 font-medium text-gray-800"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-16 bg-gray-100 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Top Companies Hiring</h2>
          <p className="text-gray-600">Work with industry-leading organizations</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
          {topCompanies.map((company) => (
            <div
              key={company.name}
              className="bg-white rounded-lg p-4 shadow hover:shadow-xl transition duration-300 flex justify-center"
            >
              <img src={company.logo} alt={company.name} className="h-16 object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Start Your Career Today</h2>
        <p className="text-gray-600 mb-8">Sign up and get access to thousands of jobs instantly</p>
        <Link
          to="/jobs"
          className="px-8 py-4 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
