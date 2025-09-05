import { useState } from "react";
import { applyJobAPI } from "../api/applicationAPI";
import { toast } from "react-toastify";

export default function ApplyForm({ jobId }) {
  const [form, setForm] = useState({ coverLetter: "", resumeUrl: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyJobAPI({ jobId, ...form });
      toast.success("Application submitted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded">
      <textarea
        name="coverLetter"
        placeholder="Cover Letter"
        value={form.coverLetter}
        onChange={handleChange}
        className="w-full border p-2"
      />
      <input
        type="text"
        name="resumeUrl"
        placeholder="Resume URL"
        value={form.resumeUrl}
        onChange={handleChange}
        className="w-full border p-2"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Apply</button>
    </form>
  );
}
