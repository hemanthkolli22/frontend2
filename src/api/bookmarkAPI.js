// src/api/bookmarkAPI.js
import API from "./axiosAPI";

// Toggle bookmark (add/remove)
export const toggleBookmarkAPI = async (jobId) => {
  // ✅ send jobId in request body (not in URL)
  const res = await API.post("/bookmarks", { jobId });
  return res.data;
};

// Get all bookmarks for logged-in user
export const getBookmarksAPI = async () => {
  const res = await API.get("/bookmarks");
  return res.data;
};
