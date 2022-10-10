import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Issues from "./Components/Issues/Issues";
import CreateIssue from "./Components/CreateIssue/CreateIssue";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Issues />} />
        <Route exact path="/create" element={<CreateIssue />} />
      </Routes>
    </Router>
  );
};

export default App;
