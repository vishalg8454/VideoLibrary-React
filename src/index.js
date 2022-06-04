import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  Homepage,
  LoginPage,
  SignupPage,
  VideoPage,
  PlaylistPage,
} from "./pages";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import { RequireAuth } from "./components";
import "../src/style.css";
import "react-toastify/dist/ReactToastify.css";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Homepage />} />
            <Route path="home" />
            <Route
              path="playlist"
              element={
                <RequireAuth>
                  <PlaylistPage />
                </RequireAuth>
              }
            />
            <Route path="liked" />
            <Route path="watch-later" />
            <Route path="history" />
            <Route path="video/:videoId" element={<VideoPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
