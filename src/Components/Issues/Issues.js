import constants from "../../Utils/constants";
import { deleteIssue, getIssues } from "../../Services/IssueServices";
import { toaster, notificationToast } from "../../Utils/toaster";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import classes from "./Issues.module.css";
import trashcan from "../../Utils/Icons/delete.svg";
import pencil from "../../Utils/Icons/edit.svg";
import Info from "../../Utils/Icons/Info";
import Check from "../../Utils/Icons/Check";

const Issues = () => {
  const navigate = useNavigate();
  // const today = useRef(new Date());
  // const dateData = {
  //   month: today.current.getMonth(),
  //   day: today.current.getDate(),
  //   year: today.current.getFullYear(),
  //   hours: today.current.getHours(),
  //   minutes: today.current.getMinutes(),
  // };

  const [issues, setIssues] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showComment, setShowComment] = useState({});
  // const min = useRef(0);
  // if (dateData.minutes > min.current) min.current = dateData.minutes;

  const handleDelete = (id) => {
    deleteIssue(id, setIsDeleted);
    setIsDeleted(false);
  };

  // const handleNotification = () => {
  //   issues.forEach((issue) => {
  //     const { time, date, alert } = issue.reminder;
  //     const option = constants.ALERT_OPTIONS.find(
  //       (option) => option.text == alert
  //     );

  //     if (option.duration != null)
  //       if (
  //         time ==
  //           `${dateData.hours}:${
  //             Number.parseInt(dateData.minutes) + option.duration
  //           }` &&
  //         date == `${dateData.year}-${dateData.month}-${dateData.day}`
  //       )
  //         notificationToast(issue);
  //   });
  // };

  useEffect(() => {
    getIssues(setIssues, setApiError, setIsDisabled);
  }, [isDeleted]);


  const handleRedirect = () => {
    navigate("/create");
  };

  const toEdit = (issue, reminder) => {
    navigate(`/${issue.id}`, { state: { issue: issue, reminder: reminder } });
  };

  const toggleComment = (id) => {
    setShowComment({ ...showComment, [id]: !showComment[id] });
  };

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
                  <Check
                    color={issue.isCompleted ? "green" : "grey"}
                    title={issue.isCompleted ? "Completed!" : "Incomplete"}
                  />
                </div>
                {!showComment[issue.id] ? (
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
          ) : apiError ? null : (
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
