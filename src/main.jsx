import React from "react"; // ✅ Add this line
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./Components/DataProvider/DataProvider";
import { reducer, initialState } from "./Utility/reducer.js";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </BrowserRouter>
);
