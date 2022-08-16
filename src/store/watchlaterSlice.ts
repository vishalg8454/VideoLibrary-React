import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./videoSlice";
import { toast } from "react-toastify";

interface WatchLaterState {
  watchLaters: any[];
  status: string;
}

const initialState: WatchLaterState = {
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
      })
      .addCase(addToWatchLater.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addToWatchLater.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          toast.success("Video added to Watch-Later.");
          state.watchLaters = action.payload.watchlater;
        }
      })
      .addCase(addToWatchLater.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        toast.error("Unable to add to Watch-Later.");
      })
      .addCase(removeFromWatchLater.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeFromWatchLater.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          toast.success("Video removed from Watch-Later.");
          state.watchLaters = action.payload.watchlater;
        }
      })
      .addCase(removeFromWatchLater.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        toast.error("Unable to remove from Watch-Later.");
      });
  },
});

export default watchLaterSlice.reducer;

interface UserAttrs {
  token: string;
}

export const fetchWatchLater = createAsyncThunk<any, UserAttrs>(
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

interface VideoAttrs {
  videoId: string;
  token: string;
}
export const addToWatchLater = createAsyncThunk<any, VideoAttrs>(
  "watchLater/add",
  async (data, thunkAPI) => {
    const { videoId, token } = data;
    try {
      const res = await axios.post(
        "/api/user/watchlater",
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

export const removeFromWatchLater = createAsyncThunk<any, VideoAttrs>(
  "watchLater/remove",
  async (data, thunkAPI) => {
    const { videoId, token } = data;
    try {
      const res = await axios.delete(`/api/user/watchlater/${videoId}`, {
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
