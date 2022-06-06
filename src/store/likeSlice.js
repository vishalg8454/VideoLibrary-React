import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./videoSlice";
import { toast } from "react-toastify";

const initialState = {
  likes: [],
};
const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikes.pending, (state, action) => {})
      .addCase(fetchLikes.fulfilled, (state, action) => {
        if (action.payload) {
          state.likes = action.payload.likes;
          console.log(action.payload.likes);
        }
      })
      .addCase(fetchLikes.rejected, (state, action) => {});
  },
});

export default likeSlice.reducer;

export const fetchLikes = createAsyncThunk(
  "like/fetch",
  async (data, thunkAPI) => {
    try {
      const { token } = data;
      const res = await axios.post("/api/user/playlists", {
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
