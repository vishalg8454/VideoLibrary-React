import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Homepage, LoginPage } from "./pages";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "../src/style.css";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Homepage />} />
            <Route path="home" />
            <Route path="playlist" />
            <Route path="liked" />
            <Route path="watch-later" />
            <Route path="history" />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
