import React from "react";
import Modal from "react-modal";
import { Navigate, Route, Routes } from "react-router-dom";
import CreateIssue from "./components/create-issue/CreateIssue";
import Issues from "./components/issues/Issues";
import NotFound from "./components/NotFound";
import UpdateIssue from "./components/update-issue/UpdateIssue";

Modal.setAppElement("#root");

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/issues" />} />
      <Route path="/issues" element={<Issues />} />
      <Route path="/issues/create" element={<CreateIssue />} />
      <Route path="/issues/edit/:id" element={<UpdateIssue />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
