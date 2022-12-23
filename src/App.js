import React, { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Issues from "./Components/Issues/Issues";
import CreateIssue from "./Components/CreateIssue/CreateIssue";
import UpdateIssue from "./Components/UpdateIssue/UpdateIssue";
import Modal from "react-modal";
import ApiContextProvider from "./Contexts/ApiContext";

Modal.setAppElement("#root");

const App = () => {
  return (
    <Router>
      <Fragment>
        <ApiContextProvider>
          <Routes>
            <Route exact path="/" element={<Issues />} />
            <Route exact path="/create" element={<CreateIssue />} />
            <Route exact path="/:id" element={<UpdateIssue />} />
          </Routes>
        </ApiContextProvider>
      </Fragment>
    </Router>
  );
};

export default App;
