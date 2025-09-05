import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-blue-900 text-gray-200">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">JobFinder</h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Trusted platform connecting job seekers with top employers. 
            Browse jobs, apply easily, and manage your career.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-yellow-400 transition duration-200">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-400 transition duration-200">About Us</a>
            </li>
            <li>
              <a href="/jobs" className="hover:text-yellow-400 transition duration-200">Find Jobs</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-400 transition duration-200">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Services / Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/blog" className="hover:text-yellow-400 transition duration-200">Blog</a>
            </li>
            <li>
              <a href="/faq" className="hover:text-yellow-400 transition duration-200">FAQ</a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-yellow-400 transition duration-200">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms" className="hover:text-yellow-400 transition duration-200">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact & Follow Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-yellow-400" />
              <span>+91 9900990099</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-yellow-400" />
              <span>support@jobfinder.com</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <span>Hyderabad, India</span>
            </li>
          </ul>
          <div className="flex space-x-5 mt-4">
            <a href="#" className="hover:text-yellow-400 transition duration-200"><Facebook /></a>
            <a href="#" className="hover:text-yellow-400 transition duration-200"><Twitter /></a>
            <a href="#" className="hover:text-yellow-400 transition duration-200"><Linkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} <span className="text-white font-semibold">JobFinder</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
