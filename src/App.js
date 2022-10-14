import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Issues from "./Components/Issues/Issues";
import CreateIssue from "./Components/CreateIssue/CreateIssue";
import UpdateIssue from "./Components/UpdateIssue/UpdateIssue";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Issues />} />
        <Route exact path="/create" element={<CreateIssue />} />
        <Route exact path="/:id" element={<UpdateIssue />} />
      </Routes>
    </Router>
  );
};

export default App;
