import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ApiContext } from "../../Contexts/ApiContext";
import {
  deleteIssue,
  getIssues,
  updateIssue
} from "../../Services/IssueServices";
import constants from "../../Utils/constants";
import { dateData, handleTimeout } from "../../Utils/counterHelper";
import handleNotification from "../../Utils/notificationHelper";
import { getItem } from "../../Utils/storage";
import { toaster } from "../../Utils/toaster";
import CommentCollapse from "../CommentCollapse";
import ApiSelectComponent from "../Forms/ApiSelectComponent";
import LoadingSpinner from "../LoadingSpinner";
import classes from "./Issues.module.css";
import IssuesList from "./IssuesList";

const Issues = () => {
  const navigate = useNavigate();
  const { toggleApiPath, apiError, toggleApiError } = useContext(ApiContext);
  const apiPath = getItem("api", "local");

  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showComment, setShowComment] = useState({});
  const [reminderDeleted, setReminderDeleted] = useState(false);
  const [today, setToday] = useState(new Date());

  const resetToday = () => setToday(new Date());

  const handleDelete = (id) => {
    deleteIssue(id, apiPath, setIsDeleted);
    setIsDeleted(false);
  };

  useEffect(() => {
    setIsDisabled(true);
    setIssues([]);
    getIssues(setIssues, toggleApiError, apiPath, setIsLoading, setIsDisabled);
  }, [apiPath, isDeleted, reminderDeleted]);

  useEffect(() => {
    handleTimeout(issues, apiError, resetToday);
  }, [issues]);

  const handleRedirect = () => {
    navigate("/create");
  };

  const toEdit = (issue, reminder) => {
    navigate(`/${issue.id}`, { state: { issue: issue, reminder: reminder } });
  };

  const toggleComment = (id) => {
    setShowComment({ ...showComment, [id]: !showComment[id] });
  };

  const collapseAllComments = () => setShowComment({});

  const removeReminder = (issue, reminderPosted, closeToast) => {
    updateIssue(
      issue.id,
      { ...issue, ["reminder"]: null, ["hasReminder"]: false },
      navigate,
      apiPath,
      reminderPosted
    );
    closeToast();
    setTimeout(() => setReminderDeleted(true), 1000);
  };

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
