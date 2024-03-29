import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./videoSlice";
import { toast } from "react-toastify";

interface HistoryState {
  histories: any[];
  status: string;
}

const initialState: HistoryState = {
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
      })
      .addCase(addToHistory.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.histories = action.payload.history;
        }
      })
      .addCase(addToHistory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeFromHistory.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeFromHistory.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.histories = action.payload.history;
          toast.success("Video removed from History");
        }
      })
      .addCase(removeFromHistory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        toast.error("Unable to remove from History");
      })
      .addCase(clearHistory.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(clearHistory.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.histories = action.payload.history;
          toast.success("History cleared successfully.");
        }
      })
      .addCase(clearHistory.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default historySlice.reducer;

interface UserAttrs {
  token: string;
}

export const fetchHistory = createAsyncThunk<any, UserAttrs>(
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

interface VideoAttrs {
  videoId: string;
  token: string;
}

export const addToHistory = createAsyncThunk<any, VideoAttrs>(
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

export const removeFromHistory = createAsyncThunk<any, VideoAttrs>(
  "history/remove",
  async (data, thunkAPI) => {
    const { videoId, token } = data;
    try {
      const res = await axios.delete(`/api/user/history/${videoId}`, {
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

export const clearHistory = createAsyncThunk<any, UserAttrs>(
  "history/clear",
  async (data, thunkAPI) => {
    const { token } = data;
    try {
      const res = await axios.delete(`/api/user/history/all`, {
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
