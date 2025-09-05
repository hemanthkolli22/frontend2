import { createSlice } from "@reduxjs/toolkit";

// --------------------
// Initial State
// --------------------
const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  isLoggedin: !!localStorage.getItem("token"),
};

// --------------------
// Slice
// --------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isLoggedin = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    addUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedin = true;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
});

export const { logout, addUser } = authSlice.actions;
export default authSlice.reducer;
