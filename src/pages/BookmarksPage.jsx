import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getBookmarksAPI, toggleBookmarkAPI } from "../api/bookmarkAPI";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all bookmarks
  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await getBookmarksAPI();
      setBookmarks(res.bookmarks || []); // [{ _id, job }]
    } catch (err) {
      console.error("Error fetching bookmarks:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Remove bookmark from this page
  const handleRemove = async (jobId) => {
    try {
      await toggleBookmarkAPI(jobId); // backend auto-removes if already bookmarked
      fetchBookmarks(); // refresh after removal
    } catch (err) {
      console.error("Error removing bookmark:", err.response || err);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) return <p className="p-6">Loading bookmarks...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Bookmarks</h2>
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((b) => (
            <JobCard
              key={b._id}
              job={b.job}
              isBookmarkPage={true}
              isInitiallyBookmarked={true}
              onDelete={handleRemove} // remove on click
              onBookmarkChange={fetchBookmarks} // also sync with parent
            />
          ))}
        </div>
      ) : (
        <p>No bookmarks found.</p>
      )}
    </div>
  );
}
