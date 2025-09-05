// src/pages/ApplicationForm.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axiosAPI";
import { uploadResume, clearResume } from "../redux/slices/resumeSlice";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { jobId = "", jobTitle = "", company = "" } = location.state || {};
  const { resumeUrl, loading } = useSelector((state) => state.resume);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      toast.error("You must be logged in!");
      navigate("/login");
    }
    return () => dispatch(clearResume());
  }, [navigate, dispatch]);

  // ✅ Auto upload when file is selected
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      dispatch(uploadResume(selected))
        .unwrap()
        .then(() => toast.success("Resume uploaded!"))
        .catch((err) => toast.error(err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeUrl) return toast.error("Upload your resume first!");
    if (!formData.name || !formData.email || !formData.phone)
      return toast.error("Fill all required fields!");

    setSubmitting(true);
    try {
      await API.post(
        "/applications",
        { job: jobId, ...formData, resumeUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Application submitted!");
      navigate("/jobs");
    } catch (err) {
      console.error("Application Error:", err);
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">
        Apply for: {jobTitle} at {company}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone (10 digits)"
          pattern="[0-9]{10}"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Cover Letter (optional)"
          value={formData.coverLetter}
          onChange={(e) =>
            setFormData({ ...formData, coverLetter: e.target.value })
          }
          rows="4"
          className="w-full p-2 border rounded"
        />

        {/* ✅ File upload */}
        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          {loading && <p className="text-blue-600">Uploading resume...</p>}
          {resumeUrl && (
            <p className="text-green-600">
              Uploaded:{" "}
              <a href={resumeUrl} target="_blank" rel="noreferrer">
                View
              </a>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting || loading}
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
