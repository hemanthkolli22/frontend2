// src/api/authAPI.js
import API from "./axiosAPI";
import tokenHelper from "../utils/tokenHelper";

// -----------------
// Login
// -----------------
export const loginAPI = async ({ email, password }) => {
  const res = await API.post("/auth/login", { email, password });

  if (res.data.token) {
    tokenHelper.setToken(res.data.token);   // Save JWT
    localStorage.setItem("role", res.data.role); // Save role separately
    localStorage.setItem("user", JSON.stringify(res.data.user || {})); // Save user info (if backend sends it)
  }

  return res.data; // { token, role, message }
};

// -----------------
// Register
// -----------------
export const registerAPI = async (userData) => {
  const res = await API.post("/auth/register", userData);

  // ⚠️ Register usually doesn’t return a token — just success + user
  if (res.data.user) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }

  return res.data; // { message, user }
};

// -----------------
// Profile
// -----------------
export const profileAPI = async () => {
  const res = await API.get("/auth/profile");
  return res.data; // user object
};

// -----------------
// Logout
// -----------------
export const logoutAPI = () => {
  tokenHelper.removeToken();   // Clear JWT
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};

