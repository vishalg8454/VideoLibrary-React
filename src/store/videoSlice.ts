import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

interface VideoState {
  data: any[];
  status: string;
}

const initialState: VideoState = {
  data: [],
  status: STATUSES.IDLE,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default videoSlice.reducer;

export const fetchVideos = createAsyncThunk(
  "videos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/videos");
      return res.data.videos;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
