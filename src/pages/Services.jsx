import { Briefcase, Users, Search, Headphones } from "lucide-react";
import { Link } from "react-router-dom"; 

function Services() {
  const services = [
    {
      icon: <Search className="w-14 h-14 text-white" />,
      title: "Job Search",
      desc: "Easily find jobs tailored to your skills, location, and preferences using our smart search system.",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      icon: <Briefcase className="w-14 h-14 text-white" />,
      title: "Employer Solutions",
      desc: "Employers can post jobs, manage applicants, and connect with top talent effortlessly.",
      gradient: "from-purple-600 to-purple-400",
    },
    {
      icon: <Users className="w-14 h-14 text-white" />,
      title: "Career Growth",
      desc: "Access resources, tips, and guidance to build a strong career path with the right opportunities.",
      gradient: "from-green-600 to-green-400",
    },
    {
      icon: <Headphones className="w-14 h-14 text-white" />,
      title: "24/7 Support",
      desc: "Our support team is always available to help with queries and ensure a smooth experience.",
      gradient: "from-yellow-500 to-yellow-400",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-28 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold">Our Services</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          Job Finder connects job seekers with employers by providing seamless services designed for both sides.
        </p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 py-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${service.gradient} p-8 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex justify-center mb-6 bg-white/20 p-5 rounded-full shadow-lg">
              {service.icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 text-center">
              {service.title}
            </h2>
            <p className="text-white text-center text-sm md:text-base">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Find Your Dream Job?</h2>
        <p className="mb-6 text-gray-200 max-w-2xl mx-auto">
          Join Job Finder today and take the next step in your career journey. Explore thousands of jobs and connect with top companies.
        </p>
        <Link
          to="/jobs"
          className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition inline-block text-lg"
        >
          Get Started Today
        </Link>
      </div>
    </div>
  );
}

export default Services;
