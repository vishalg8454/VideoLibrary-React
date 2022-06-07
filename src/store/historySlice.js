import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./videoSlice";
import { toast } from "react-toastify";

const initialState = {
  histories: [],
  status: STATUSES.IDLE,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.histories = action.payload.history;
        }
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default historySlice.reducer;

export const fetchHistory = createAsyncThunk(
  "history/fetch",
  async (data, thunkAPI) => {
    const { token } = data;
    try {
      const res = await axios.get("/api/user/history", {
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
