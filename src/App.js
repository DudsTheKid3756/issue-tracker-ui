import React, { useContext } from "react";
import Modal from "react-modal";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import WelcomePage from "./Components/Home/WelcomePage";
import CreateIssue from "./Components/CreateIssue/CreateIssue";
import Issues from "./Components/Issues/Issues";
import UpdateIssue from "./Components/UpdateIssue/UpdateIssue";
import { LoginContext } from "./Contexts/LoginContext";
import Protected from "./Protected";

Modal.setAppElement("#root");

const App = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <Issues />
          </Protected>
        }
      />
      <Route
        path="/welcome"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <WelcomePage />
          </Protected>
        }
      />
      <Route
        path="/create"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <CreateIssue />
          </Protected>
        }
      />
      <Route
        path="/:id"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <UpdateIssue />
          </Protected>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
