import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { clearStorage } from "./Utils/storage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
clearStorage("local");
