import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ApiContextProvider from "./Contexts/ApiContext";
import "./index.css";
import handleStorage from "./Utils/storage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ApiContextProvider>
      <App />
    </ApiContextProvider>
  </Router>
);
handleStorage("clear", "local");
