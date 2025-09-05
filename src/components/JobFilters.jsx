// src/pages/JobListPage.jsx
import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { fetchJobsAPI } from "../api/axiosAPI";
import { getBookmarksAPI } from "../api/bookmarkAPI";
import tokenHelper from "../utils/tokenHelper";

export default function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    type: "",
    experience: "",
  });
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // jobs per page

  // Fetch jobs with pagination and filters
  const fetchJobs = async (activePage = page, activeFilters = filters) => {
    try {
      setLoading(true);
      const res = await fetchJobsAPI(activePage, limit, activeFilters);
      setJobs(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching jobs:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bookmarked jobs
  const fetchBookmarks = async () => {
    try {
      const token = tokenHelper.getToken();
      if (!token) return;
      const res = await getBookmarksAPI();
      const ids = (res.data.bookmarks || []).map((b) => b.job?._id || b.job);
      setBookmarkedJobs(ids);
    } catch {
      console.warn("No bookmarks (maybe unauthenticated).");
    }
  };

  // Initial load
  useEffect(() => {
    fetchJobs();
    fetchBookmarks();
  }, []);

  // Refetch jobs when filters or page change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchJobs(page, filters);
    }, 300); // debounce
    return () => clearTimeout(delayDebounce);
  }, [filters, page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); // reset to page 1 on filter change
  };

  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  if (loading) return <p className="p-6">Loading jobs...</p>;

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-white p-4 rounded-xl shadow mb-6">
        <input
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          placeholder="Keyword (title)"
          className="border rounded px-3 py-2"
        />
        <input
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Location"
          className="border rounded px-3 py-2"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="">Any Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
        <select
          name="experience"
          value={filters.experience}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="">Any Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3 years">1-3 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
        </select>
      </div>

      {/* Job list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) =>
            job?._id ? (
              <JobCard
                key={job._id}
                job={job}
                isInitiallyBookmarked={bookmarkedJobs.includes(job._id)}
                onBookmarkChange={fetchBookmarks}
              />
            ) : null
          )
        ) : (
          <p>No jobs found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-3">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
