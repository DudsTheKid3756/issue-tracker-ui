import constants from "../../Utils/constants";
import { deleteIssue, getIssues } from "../../Services/IssueServices";
import { toaster } from "../../Utils/toaster";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import classes from "./Issues.module.css";
import trashcan from "../../Utils/Icons/delete.svg";
import pencil from "../../Utils/Icons/edit.svg";
import Info from "../../Utils/Icons/Info";
import Check from "../../Utils/Icons/Check";
import handleNotification from "../../Utils/notificationHelper";

const Issues = () => {
  const navigate = useNavigate();
  const [today, setToday] = useState(new Date());
  const dateData = new Map([
    ["month", today.getMonth() + 1],
    ["day", today.getDate()],
    ["year", today.getFullYear()],
    ["hours", today.getHours()],
    ["minutes", today.getMinutes()],
    ["seconds", today.getSeconds()],
  ]);

  const [issues, setIssues] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showComment, setShowComment] = useState({});

  const resetToday = () => setToday(new Date());

  const handleDelete = (id) => {
    deleteIssue(id, setIsDeleted);
    setIsDeleted(false);
  };

  useEffect(() => {
    getIssues(setIssues, setApiError, setIsDisabled);
  }, [isDeleted]);

  useEffect(() => {
    while (issues.length > 0) {
      const timerId = setInterval(resetToday, 1000);
      return () => {
        clearInterval(timerId);
      };
    }
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

  handleNotification(issues, dateData);

  return (
    <div className={classes.page}>
      <div className={classes.headContainer}>
        <h1 className={classes.header}>Issue Tracker</h1>
        <button
          className={`${classes.button} ${classes.head}`}
          onClick={handleRedirect}
          disabled={isDisabled}
        >
          New Issue
        </button>
      </div>
      <div className={classes.issues}>
        <span className={classes.issuesContainer}>
          {issues.length > 0 ? (
            issues.map((issue) => (
              <div key={issue.id} className={classes.item}>
                <div className={classes.titleContainer}>
                  <h3 className={classes.title}>{issue.title}</h3>
                  <Info
                    title="Issue Comment"
                    onClick={() => toggleComment(issue.id)}
                  />
                  <span className={classes.created}>{issue.created}</span>
                  <img
                    className={classes.icon}
                    src={pencil}
                    onClick={() => toEdit(issue, issue.reminder)}
                  />
                  <img
                    className={classes.icon}
                    src={trashcan}
                    onClick={() => handleDelete(issue.id)}
                  />
                  {issue.isCompleted ? <Check /> : null}
                </div>
                {showComment[issue.id] ? (
                  <p
                    className={classes.comment}
                    style={{ borderColor: issue.color }}
                  >
                    {issue.comment}
                  </p>
                ) : (
                  <p
                    className={classes.spacer}
                    style={{ borderColor: issue.color }}
                  ></p>
                )}
              </div>
            ))
          ) : apiError ? (
            <p className={classes.noIssues}>{constants.API_ERROR}</p>
          ) : (
            <p className={classes.noIssues}>
              No issues to show. Add a new one!
            </p>
          )}
          {apiError ? toaster(constants.API_ERROR, "error") : null}
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Issues;
