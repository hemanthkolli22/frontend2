// src/api/applicationsAPI.js
import axios from "axios";

const API = axios.create({ baseURL: "https://backend2-fid2.onrender.com/applications" });

// 🔑 Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// 🟢 Jobseeker applies
export const applyJobAPI = (payload) => API.post("/", payload);

// 🟢 Jobseeker - get my applications
export const fetchMyApplicationsAPI = () => API.get("/my");

// 🟢 Recruiter/Admin - view applications for a specific job
export const fetchApplicationsByJobAPI = (jobId) => API.get(`/job/${jobId}`);

// 🟢 Admin - view all applications
export const fetchAllApplicationsAPI = () => API.get("/");

// 🟢 Recruiter/Admin - update application status
export const updateApplicationStatusAPI = (appId, status) =>
  API.patch(`/${appId}/status`, { status });
