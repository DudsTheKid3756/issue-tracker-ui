import React from "react";
import Modal from "react-modal";
import { Route, Routes } from "react-router-dom";
import CreateIssue from "./components/create-issue/CreateIssue";
import Issues from "./components/issues/Issues";
import LoginPage from "./components/login/LoginPage";
import UpdateIssue from "./components/update-issue/UpdateIssue";

Modal.setAppElement("#root");

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Issues />} />
      <Route path="/create" element={<CreateIssue />} />
      <Route path="/:id" element={<UpdateIssue />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
