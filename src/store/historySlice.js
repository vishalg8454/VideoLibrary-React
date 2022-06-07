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
      })
      .addCase(addToHistory.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        console.log("pending");
      })
      .addCase(addToHistory.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        console.log("success");
        if (action.payload) {
          state.histories = action.payload.history;
        }
      })
      .addCase(addToHistory.rejected, (state, action) => {
        console.log("rejected");
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

export const addToHistory = createAsyncThunk(
  "history/add",
  async (data, thunkAPI) => {
    const { videoId, token } = data;
    console.log(videoId);
    console.log(token);
    console.log("add to history");
    try {
      const res = await axios.post(
        "/api/user/history",
        { video: { _id: videoId } },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);
