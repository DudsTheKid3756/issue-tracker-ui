import jwtDecode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ApiContext } from "../../contexts/ApiContext";
import { LoginContext } from "../../contexts/LoginContext";
import {
  deleteIssue,
  getIssues,
  updateIssue
} from "../../services/IssueServices";
import constants from "../../utils/constants";
import { dateData, handleTimeout } from "../../utils/counterHelper";
import handleNotification from "../../utils/notificationHelper";
import handleStorage from "../../utils/storage";
import { toaster } from "../../utils/toaster";
import { getToken, removeSession } from "../../utils/tokenHelper";
import CommentCollapse from "../CommentCollapse";
import ApiSelectComponent from "../forms/ApiSelectComponent";
import LoadingSpinner from "../LoadingSpinner";
import LoginPage from "../login/LoginPage";
import classes from "./Issues.module.css";
import IssuesList from "./IssuesList";

const Issues = () => {
  const { toggleApiPath, apiError, toggleApiError } = useContext(ApiContext);
  const { isLoggedIn, changeIsLoggedIn } = useContext(LoginContext);

  const navigate = useNavigate();
  const apiPath = handleStorage("get", "local", "api");
  const storedToken = getToken();
  const decodedToken = storedToken !== null ? jwtDecode(storedToken) : null;
  const userRole = () => {
    let role;
    try {
      role = decodedToken[constants.ROLE_KEY];
    } catch (e) {
      console.error("Error: JWT token invalid", e);
    }
    return role;
  };

  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showComment, setShowComment] = useState({});
  const [reminderDeleted, setReminderDeleted] = useState(false);
  const [today, setToday] = useState(new Date());

  const resetToday = () => setToday(new Date());
  const collapseAllComments = () => setShowComment({});

  useEffect(() => {
    setIsDisabled(true);
    setIssues([]);
    getIssues(setIssues, toggleApiError, apiPath, setIsLoading, setIsDisabled);
    checkToken();
  }, [apiPath, isDeleted, reminderDeleted, isLoggedIn]);

  useEffect(() => {
    handleTimeout(issues, apiError, resetToday);
  }, [issues]);

  function checkToken() {
    if (decodedToken) {
      const tokenExpirationMs = decodedToken.exp;
      const currentTimeMs = (Date.now() / 1000).toFixed(0);
      if (tokenExpirationMs < currentTimeMs) {
        removeSession();
        changeIsLoggedIn(false);
      } else changeIsLoggedIn(true);
    }
  }

  function handleDelete(id) {
    deleteIssue(id, apiPath, setIsDeleted);
    setIsDeleted(false);
  }

  function toEdit(issue, reminder) {
    navigate(`issues/edit/${issue.id}`, {
      state: { issue: issue, reminder: reminder },
    });
  }

  function toggleComment(id) {
    setShowComment({ ...showComment, [id]: !showComment[id] });
  }

  function removeReminder(issue, reminderPosted, closeToast) {
    updateIssue(
      issue.id,
      { ...issue, ["reminder"]: null, ["hasReminder"]: false },
      navigate,
      apiPath,
      reminderPosted
    );
    closeToast();
    setTimeout(() => setReminderDeleted(true), 1000);
  }

  function logout() {
    removeSession();
    location.reload();
  }

  handleNotification(issues, dateData(today), removeReminder);

  return (
    <>
      <div className={classes.page}>
        {!isLoggedIn ? (
          <LoginPage setIsLoading={setIsLoading} />
        ) : (
          <>
            <div className={classes.headContainer}>
              <h1 className={classes.header}>Issue Tracker</h1>
              {userRole() !== "admin" ? null : (
                <ApiSelectComponent
                  apiPath={apiPath}
                  toggleApiPath={toggleApiPath}
                />
              )}
              <button className="btn btn-primary" onClick={() => logout()}>Logout</button>
              <button
                className={`btn btn-success ${classes.button} ${classes.head}`}
                onClick={() => navigate("/issues/create")}
                disabled={isDisabled}
              >
                New Issue
              </button>
            </div>
            <div className={classes.issues}>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <span className={classes.issuesContainer}>
                  {issues.length > 0 ? (
                    <IssuesList
                      issues={issues}
                      showComment={showComment}
                      toggleComment={toggleComment}
                      toEdit={toEdit}
                      handleDelete={handleDelete}
                    />
                  ) : apiError ? (
                    <p className={classes.noIssues}>{constants.API_ERROR}</p>
                  ) : (
                    <p className={classes.noIssues}>
                      No issues to show. Add a new one!
                    </p>
                  )}
                  {apiError ? toaster(constants.API_ERROR, "error") : null}
                </span>
              )}
            </div>
            <ToastContainer />
          </>
        )}
        <CommentCollapse
          showComment={showComment}
          collapseAllComments={collapseAllComments}
        />
      </div>
    </>
  );
};

export default Issues;
