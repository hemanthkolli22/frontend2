import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadResume } from "../redux/slices/resumeSlice";
import { toast } from "react-toastify";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { loading, resumeUrl, error } = useSelector((state) => state.resume);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file");
    dispatch(uploadResume(file))
      .unwrap()
      .then(() => toast.success("Resume uploaded!"))
      .catch((err) => toast.error(err));
  };

  return (
    <form onSubmit={handleUpload} className="mt-4">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="block mb-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      {resumeUrl && (
        <p className="text-green-600 mt-2">
          ✅ Uploaded:{" "}
          <a href={resumeUrl} target="_blank" rel="noreferrer">
            View Resume
          </a>
        </p>
      )}
      {error && <p className="text-red-600 mt-2">❌ {error}</p>}
    </form>
  );
};

export default ResumeUpload;
