// src/api/axiosAPI.js
import axios from "axios";

// ✅ Create axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://backend2-fid2.onrender.com",
  withCredentials: false, // we handle token manually
});

// ✅ Attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================= JOB SEEKER =================

// 🔹 Apply for a job (submit application)
export const applyJobAPI = (payload) => API.post("/applications", payload);

// 🔹 Get my applications (job seeker)
export const getMyApplicationsAPI = async () => {
  const res = await API.get("/applications/my");
  return res.data; // { success, applications }
};

// ================= RECRUITER / ADMIN =================

// 🔹 Fetch applicants for a specific job
export const fetchJobApplicantsAPI = async (jobId) => {
  const res = await API.get(`/applications/job/${jobId}`);
  return res.data; // { success, applications }
};

// 🔹 Update application status (accept/reject)
export const updateApplicationStatusAPI = (appId, status) =>
  API.patch(`/applications/${appId}/status`, { status });

// ================= JOBS =================

// 🔹 Fetch all jobs (supports filters & pagination)
export const fetchJobsAPI = (filters = {}) =>
  API.get("/jobs", { params: filters });

// 🔹 Create a new job
export const createJobAPI = (jobData) => API.post("/jobs", jobData);

// 🔹 Update a job
export const updateJobAPI = (jobId, jobData) =>
  API.put(`/jobs/${jobId}`, jobData);

// 🔹 Delete a job
export const deleteJobAPI = (jobId) => API.delete(`/jobs/${jobId}`);

export default API;
