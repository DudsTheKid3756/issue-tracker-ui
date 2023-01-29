import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ApiContext } from "../../contexts/ApiContext";
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
import CommentCollapse from "../CommentCollapse";
import ApiSelectComponent from "../forms/ApiSelectComponent";
import LoadingSpinner from "../LoadingSpinner";
import classes from "./Issues.module.css";
import IssuesList from "./IssuesList";

const Issues = () => {
  const { toggleApiPath, apiError, toggleApiError } = useContext(ApiContext);
  const navigate = useNavigate();
  const apiPath = handleStorage("get", "local", "api");

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
  }, [apiPath, isDeleted, reminderDeleted]);

  useEffect(() => {
    handleTimeout(issues, apiError, resetToday);
  }, [issues]);

  function handleDelete(id) {
    deleteIssue(id, apiPath, setIsDeleted);
    setIsDeleted(false);
  }

  function handleRedirect() {
    navigate("/create");
  }

  function toEdit(issue, reminder) {
    navigate(`/${issue.id}`, { state: { issue: issue, reminder: reminder } });
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

  handleNotification(issues, dateData(today), removeReminder);

  return (
    <>
      <div className={classes.page}>
        <div className={classes.headContainer}>
          <h1 className={classes.header}>Issue Tracker</h1>
          <ApiSelectComponent apiPath={apiPath} toggleApiPath={toggleApiPath} />
          <button
            className={`${classes.button} ${classes.head}`}
            onClick={handleRedirect}
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
      </div>
      <CommentCollapse
        showComment={showComment}
        collapseAllComments={collapseAllComments}
      />
    </>
  );
};

export default Issues;
