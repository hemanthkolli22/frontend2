import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axiosAPI";

export const uploadResume = createAsyncThunk(
  "resume/upload",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const token = localStorage.getItem("token");

      const res = await API.post("/upload/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      return res.data.url;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Upload failed");
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState: { resumeUrl: "", loading: false, error: null },
  reducers: {
    clearResume: (state) => {
      state.resumeUrl = "";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadResume.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(uploadResume.fulfilled, (state, action) => { state.loading = false; state.resumeUrl = action.payload; })
      .addCase(uploadResume.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearResume } = resumeSlice.actions;
export default resumeSlice.reducer;
