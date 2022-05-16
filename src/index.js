import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Homepage } from "./pages";
import "../src/style.css";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
          <Route path="home"/>
          <Route path="playlist"/>
          <Route path="liked"/>
          <Route path="watch-later"/>
          <Route path="history"/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
