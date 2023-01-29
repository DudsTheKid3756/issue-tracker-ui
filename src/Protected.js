import React from "react";
import { Navigate } from "react-router-dom";
import handleStorage from "./Utils/storage";

const Protected = ({ isLoggedIn, children }) => {
  const authToken = handleStorage("get", "session", "authState");
  if (!isLoggedIn || !authToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protected;
