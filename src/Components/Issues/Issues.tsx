import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DecodedToken } from "../../@types/DecodedToken";
import { Issue } from "../../@types/Issue";
import { Reminder } from "../../@types/Reminder";
import { ApiContext } from "../../contexts/ApiContext";
import { LoginContext } from "../../contexts/LoginContext";
import {
  deleteIssue,
  getIssues,
  updateIssue,
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
import IssuesList from "./IssuesList";

const Issues = () => {
  const { toggleApiPath, apiError, toggleApiError } = useContext(ApiContext);
  const { isLoggedIn, changeIsLoggedIn } = useContext(LoginContext);

  const navigate = useNavigate();
  const apiPath = handleStorage("get", "local", "api");
  const storedToken = jwtDecode(getToken()!) as DecodedToken;
  const userRole = () => {
    let role;
    try {
      role = storedToken[constants.ROLE_KEY];
    } catch (e) {
      console.error("Error: JWT token invalid", e);
    }
    return role;
  };

  const [issues, setIssues] = useState([] as Issue[]);
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
  }, [apiPath, isDeleted, reminderDeleted]);

  useEffect(() => {
    handleTimeout(issues, apiError, resetToday);
  }, [issues]);

  function checkToken() {
    if (storedToken) {
      const tokenExpirationMs = storedToken.exp;
      const currentTimeMs = Date.now() / 1000;
      if (tokenExpirationMs < currentTimeMs) {
        removeSession();
        changeIsLoggedIn(false);
      } else changeIsLoggedIn(true);
    }
  }

  function handleDelete(id: number) {
    deleteIssue(id, apiPath, setIsDeleted);
    setIsDeleted(false);
  }

  function toEdit(issue: Issue, reminder: Reminder) {
    navigate(`/${issue.id}`, { state: { issue: issue, reminder: reminder } });
  }

  function toggleComment(id: number) {
    setShowComment({
      ...showComment,
      [id]: !showComment[id as keyof typeof showComment],
    });
  }

  function removeReminder(
    issue: Issue,
    reminderPosted: boolean,
    closeToast: unknown
  ) {
    updateIssue(
      issue.id,
      { ...issue, ["reminder"]: null, ["hasReminder"]: false },
      navigate,
      apiPath,
      reminderPosted
    );
    closeToast as (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    setTimeout(() => setReminderDeleted(true), 1000);
  }

  handleNotification(issues, dateData(today), removeReminder);

  return (
    <>
      <div className="">
        <div className="">
          <h1 className="">Issue Tracker</h1>
          {!isLoggedIn && userRole() !== "admin" ? null : (
            <ApiSelectComponent
              apiPath={apiPath}
              toggleApiPath={toggleApiPath}
            />
          )}
          <button
            className=""
            onClick={() => navigate("/create")}
            disabled={isDisabled}
          >
            New Issue
          </button>
        </div>
        <div className="">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <span className="">
              <>
                {issues.length > 0 ? (
                  <IssuesList
                    issues={issues}
                    showComment={showComment}
                    toggleComment={toggleComment}
                    toEdit={toEdit}
                    handleDelete={handleDelete}
                  />
                ) : apiError ? (
                  <p className="">{constants.API_ERROR}</p>
                ) : (
                  <p className="">No issues to show. Add a new one!</p>
                )}
                {apiError ? toaster(constants.API_ERROR, "error") : null}
              </>
            </span>
          )}
        </div>
        <ToastContainer />
      </div>
      <CommentCollapse
        showComment={showComment}
        collapseAllComments={collapseAllComments}
      />
    </>
  );
};

export default Issues;
