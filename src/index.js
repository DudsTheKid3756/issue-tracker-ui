import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ApiContextProvider from "./contexts/ApiContext";
import LoginContextProvider from "./contexts/LoginContext";
import "./index.css";
import handleStorage from "./utils/storage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <LoginContextProvider>
      <ApiContextProvider>
        <App />
      </ApiContextProvider>
    </LoginContextProvider>
  </Router>
);
handleStorage("clear", "local");
