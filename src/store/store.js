import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";
import authReducer from "./authSlice";
import playlistReducer from "./playlistSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    auth: authReducer,
    playlist: playlistReducer,
  },
});

export default store;
