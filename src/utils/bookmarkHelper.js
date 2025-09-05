// ✅ Save jobId to localStorage bookmarks
export const addBookmark = (jobId) => {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  if (!bookmarks.includes(jobId)) {
    bookmarks.push(jobId);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
};

// ✅ Remove jobId from localStorage bookmarks
export const removeBookmark = (jobId) => {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks = bookmarks.filter((id) => id !== jobId);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};

// ✅ Check if a job is bookmarked
export const isBookmarked = (jobId) => {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  return bookmarks.includes(jobId);
};

// ✅ Get all bookmarked job IDs
export const getBookmarks = () => {
  return JSON.parse(localStorage.getItem("bookmarks")) || [];
};
