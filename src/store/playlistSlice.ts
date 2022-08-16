import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./videoSlice";
import { toast } from "react-toastify";

interface PlaylistState{
  playlists:any[];
  status:string;
}
const initialState:PlaylistState = {
  playlists: [],
  status: STATUSES.IDLE,
};
const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylist.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.playlists = action.payload.playlists;
        }
      })
      .addCase(fetchPlaylist.rejected, (state, rejected) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(createPlaylist.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          state.playlists = action.payload.playlists;
          toast.success("Playlist added successfully.");
        }
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addToPlaylist.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addToPlaylist.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          toast.success("Video added to playlist.");
          state.playlists = action.payload.playlists;
        }
      })
      .addCase(addToPlaylist.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeFromPlaylist.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeFromPlaylist.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          toast.success("Video removed from playlist.");
          state.playlists = action.payload.playlists;
        }
      })
      .addCase(removeFromPlaylist.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(deletePlaylist.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (action.payload) {
          toast.success("Playlist deleted successfuly.");
          state.playlists = action.payload.playlists;
        }
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default playlistSlice.reducer;

interface UserAttrs{
  token: string;
}

export const fetchPlaylist = createAsyncThunk<any,UserAttrs>(
  "playlist/fetch",
  async (data, thunkAPI) => {
    try {
      const {token} = data;
      const res = await axios.get("/api/user/playlists", {
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

interface PlaylistAttributes {
  token: string;
  playlistName?: string;
  playlistId?:string;
  videoId?:string;
}
export const createPlaylist = createAsyncThunk<any, PlaylistAttributes>(
  "playlist/create",
  async (data, thunkAPI) => {
    try {
      const { token, playlistName } = data;
      const res = await axios.post(
        "/api/user/playlists",
        { playlist: { title: playlistName, description: "bar bar bar" } },
        {
          headers: {
            authorization: token,
          },
        }
      );
      //   console.log(res.data.playlists);
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToPlaylist = createAsyncThunk<any,PlaylistAttributes>(
  "playlist/add",
  async (data, thunkAPI) => {
    const { playlistId, videoId, token,playlistName } = data;
    try {
      const res = await axios.post(
        `/api/user/playlists/${playlistId}`,
        { video: { _id: videoId } },
        {
          headers: {
            authorization: token,
          },
        }
      );
      //   console.log(res.data.playlists);
      return res.data;
    } catch (error) {
      //   console.log(error.message);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeFromPlaylist = createAsyncThunk<any,PlaylistAttributes>(
  "playlist/remove",
  async (data, thunkAPI) => {
    const { playlistId, videoId, token } = data;
    try {
      const res = await axios.delete(
        `/api/user/playlists/${playlistId}/${videoId}`,
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

export const deletePlaylist = createAsyncThunk<any,PlaylistAttributes>(
  "playlist/delete",
  async (data, thunkAPI) => {
    const { playlistId, token } = data;
    try {
      const res = await axios.delete(`/api/user/playlists/${playlistId}`, {
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
