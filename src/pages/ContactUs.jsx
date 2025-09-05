import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("✅ Your message has been sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
          Have questions or need assistance? Our team is ready to help you 24/7.
        </p>
      </div>

      {/* Main Contact Section */}
      <div className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        {/* Left Info & Map */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-blue-900">Get in Touch</h2>
          <p className="text-gray-700">
            Reach out to us directly through the following details or send us a message using the form.
          </p>

          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <Phone className="text-blue-600 w-6 h-6" />
              <span className="text-gray-700 font-medium">+91 9900990099</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <Mail className="text-blue-600 w-6 h-6" />
              <span className="text-gray-700 font-medium">support@jobfinder.com</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <MapPin className="text-blue-600 w-6 h-6" />
              <span className="text-gray-700 font-medium">Hyderabad, India</span>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-10 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.207289014667!2d78.486671!3d17.385044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99fda5b8e1f7%3A0xe2a05b7d3b1e3d21!2sHyderabad!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                required
                className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-blue-900 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg transition transform hover:scale-105"
            >
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
