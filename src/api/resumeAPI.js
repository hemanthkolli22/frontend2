import API from "./axiosAPI";

// data should be a FormData object containing the file
export const uploadResumeAPI = async (formData) => {
  try {
    const token = localStorage.getItem("token"); // include if route requires auth
    const res = await API.post("/upload/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return res.data; // { success: true, url: "..." }
  } catch (err) {
    throw err.response?.data?.message || "Resume upload failed";
  }
};
