import { useEffect, useState } from "react";
import API from "../api/axiosAPI";
import JobCard from "../components/JobCard";

export default function MyBookmarksPage() {
  const [jobs, setJobs] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const res = await API.get("/bookmarks");
      setJobs(res.data.jobs || []);  // ✅ use jobs array now
    } catch (err) {
      console.error("Error fetching bookmarks:", err.response || err);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Saved Jobs</h2>
      {jobs.length > 0 ? (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isBookmarkPage={true}
              isInitiallyBookmarked={true}
              onBookmarkChange={fetchBookmarks}
            />
          ))}
        </div>
      ) : (
        <p>No saved jobs yet</p>
      )}
    </div>
  );
}
