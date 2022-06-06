import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./videoSlice";
import { toast } from "react-toastify";

const initialState = {
  watchLaters: [],
  status: STATUSES.IDLE,
};

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchLater.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchWatchLater.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.watchLaters = action.payload.watchlater;
        }
      })
      .addCase(fetchWatchLater.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default watchLaterSlice.reducer;

export const fetchWatchLater = createAsyncThunk(
  "watchLater/fetch",
  async (data, thunkAPI) => {
    const { token } = data;
    try {
      const res = await axios.get("/api/user/watchlater", {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
