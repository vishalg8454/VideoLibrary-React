import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./videoSlice";
import { toast } from "react-toastify";

const initialState = {
  likes: [],
  status: STATUSES.IDLE,
};
const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikes.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.likes = action.payload.likes;
        }
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addToLikes.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addToLikes.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.likes = action.payload.likes;
          toast.success("Video added to Likes.");
        }
      })
      .addCase(addToLikes.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        toast.error("Unable to add to Likes.");
      })
      .addCase(removeFromLikes.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeFromLikes.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.likes = action.payload.likes;
          toast.success("Video removed from Likes.");
        }
      })
      .addCase(removeFromLikes.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        toast.error("Unable to remove from Likes.");
      });
  },
});

export default likeSlice.reducer;

export const fetchLikes = createAsyncThunk(
  "like/fetch",
  async (data, thunkAPI) => {
    const { token } = data;
    try {
      const res = await axios.get("/api/user/likes", {
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

export const addToLikes = createAsyncThunk(
  "like/add",
  async (data, thunkAPI) => {
    const { videoId, token } = data;
    try {
      const res = await axios.post(
        "/api/user/likes",
        { video: { _id: videoId } },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeFromLikes = createAsyncThunk(
  "like/remove",
  async (data, thunkAPI) => {
    const { videoId, token } = data;
    try {
      const res = await axios.delete(`/api/user/likes/${videoId}`, {
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
