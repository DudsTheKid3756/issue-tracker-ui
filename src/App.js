import React from "react";
import Modal from "react-modal";
import { Route, Routes } from "react-router-dom";
import CreateIssue from "./Components/CreateIssue/CreateIssue";
import Issues from "./Components/Issues/Issues";
import UpdateIssue from "./Components/UpdateIssue/UpdateIssue";

Modal.setAppElement("#root");

const App = () => (
  <Routes>
    <Route exact path="/" element={<Issues />} />
    <Route exact path="/create" element={<CreateIssue />} />
    <Route exact path="/:id" element={<UpdateIssue />} />
  </Routes>
);

export default App;
