// src/components/JobCard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  BookmarkCheck,
  Trash2,
  MapPin,
  Briefcase,
  XCircle,
} from "lucide-react";
import { addBookmark, removeBookmark, isBookmarked } from "../utils/bookmarkHelper";

export default function JobCard({ job, onDelete, isBookmarkPage = false }) {
  const [bookmarked, setBookmarked] = useState(false);

  // Initialize bookmark state
  useEffect(() => {
    if (job?._id) setBookmarked(isBookmarked(job._id));
  }, [job]);

  const toggleBookmark = () => {
    if (!job?._id) return;
    if (bookmarked) {
      removeBookmark(job._id);
      setBookmarked(false);
    } else {
      addBookmark(job._id);
      setBookmarked(true);
    }
  };

  if (!job) return null; // Safety check

  return (
    <div className="border rounded-xl p-5 shadow hover:shadow-lg transition bg-white">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{job.title || "No Title"}</h3>
          <p className="text-sm text-gray-500">{job.company || "No Company"}</p>
          <p className="text-sm text-gray-600 mt-1">
            Salary: {job.salary || "N/A"}
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {job.location || "N/A"}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={16} /> {job.type || "N/A"}
            </span>
          </div>
        </div>

        {/* Bookmark button */}
        <button
          onClick={toggleBookmark}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
        >
          {bookmarked ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
        </button>
      </div>

      <p className="mt-4 text-gray-700 text-sm line-clamp-3">
        {job.description || "No Description"}
      </p>

      <div className="flex justify-between items-center mt-6">
        <Link
          to="/application-form"
          state={{
            jobId: job._id,
            jobTitle: job.title,
            company: job.company,
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Apply
        </Link>

        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(job._id)}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
          >
            {isBookmarkPage ? <XCircle size={18} /> : <Trash2 size={18} />}
            {isBookmarkPage ? "Remove" : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
}
