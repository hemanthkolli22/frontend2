export const registerAPI = "http://localhost:5000/api/auth/register";
export const loginAPI = "http://localhost:5000/api/auth/login";

// ✅ Add this for resume download
export const downloadResumeAPI = "http://localhost:5000/api/users"; // We'll append /:userId/resume when calling

export const bookmarkAPI="http://localhost:5000/api/bookmarks/:jobId"