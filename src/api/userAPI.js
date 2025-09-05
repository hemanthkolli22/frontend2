import API from "./axiosAPI";

// ✅ Resume Upload (Cloudinary via backend)
export const uploadResumeAPI = async (formData) => {
  const res = await API.post("/api/upload/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

