// src/api/jobsAPI.js
import API from "./axiosAPI";

// ---------- Public ----------
export const fetchJobsAPI = async (filters) => {
  const res = await API.get("/jobs", { params: filters });
  return res.data;
};

export const fetchJobByIdAPI = async (id) => {
  const res = await API.get(`/jobs/${id}`);
  return res.data;
};

// ---------- Job Seeker ----------
export const applyToJobAPI = async (jobId) => {
  // Backend will accept empty body if resume not provided
  const res = await API.post(`/jobs/${jobId}/apply`);
  return res.data;
};

export const getMyApplicationsAPI = async () => {
  const res = await API.get("/jobs/my-applications");
  return res.data;
};

// ---------- Employer/Admin ----------
export const createJobAPI = async (jobData) => {
  const res = await API.post("/jobs", jobData);
  return res.data;
};

export const updateJobAPI = async (id, jobData) => {
  const res = await API.put(`/jobs/${id}`, jobData);
  return res.data;
};

export const deleteJobAPI = async (id) => {
  const res = await API.delete(`/jobs/${id}`);
  return res.data;
};

export const getJobApplicantsAPI = async (jobId) => {
  const res = await API.get(`/jobs/${jobId}/applications`);
  return res.data;
};

// ---------- User ----------
export const getUserApplicationsAPI = async (userId) => {
  const res = await API.get(`/users/${userId}/applications`);
  return res.data;
};
