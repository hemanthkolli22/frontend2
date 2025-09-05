// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../redux/slices/authSlice.js";
import axios from "axios";
import { loginAPI, downloadResumeAPI } from "../API's.js";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loggedInUser, setLoggedInUser] = useState(null); // track updated user
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((s) => s.auth);

  useEffect(() => {
    if (user) setLoggedInUser(user);
  }, [user]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginAPI, form);
      const { token, user } = response.data;

      if (!token || !user) throw new Error("Invalid response format: token or user missing");

      dispatch(addUser({ user, token }));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setLoggedInUser(user);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleDownloadResume = async () => {
    if (!loggedInUser) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${downloadResumeAPI}/${loggedInUser._id}/resume`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${loggedInUser.name}_resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Resume download error:", err);
      alert("Failed to download resume");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Show download button only if logged-in user is a jobseeker */}
        {loggedInUser?.role === "jobseeker" && (
          <button
            onClick={handleDownloadResume}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Download Resume
          </button>
        )}

        <p className="mt-6 text-center text-gray-600 text-sm">
          If not registered?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
