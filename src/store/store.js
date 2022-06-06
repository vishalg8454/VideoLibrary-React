import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";
import authReducer from "./authSlice";
import playlistReducer from "./playlistSlice";
import likeReducer from "./likeSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    auth: authReducer,
    playlist: playlistReducer,
    like: likeReducer,
  },
});

export default store;
