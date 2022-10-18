import constants from "../../Utils/constants";
import { deleteIssue, getIssues } from "../../Services/IssueServices";
import toaster from "../../Utils/toaster";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import classes from "./Issues.module.css";
import trashcan from "../../Utils/delete.svg";
import pencil from "../../Utils/edit.svg";
import Check from "../../Utils/Check";

const Issues = () => {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (id) => {
    deleteIssue(id, setIsDeleted);
    setIsDeleted(false);
  };

  useEffect(() => {
    getIssues(setIssues, setApiError, setIsDisabled);
  }, [isDeleted]);

  const handleRedirect = () => {
    navigate("/create");
  };

  const toEdit = (issue) => {
    navigate(`/${issue.id}`, { state: issue });
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
                  <span className={classes.created}>{issue.created}</span>
                  <img
                    className={classes.icon}
                    src={pencil}
                    onClick={() => toEdit(issue)}
                  />
                  <img
                    className={classes.icon}
                    src={trashcan}
                    onClick={() => handleDelete(issue.id)}
                  />
                  <span style={{ marginLeft: "48%" }}></span>
                  <Check
                    color={issue.isCompleted ? "green" : "grey"}
                    title={issue.isCompleted ? "Completed!" : "Incomplete"}
                  />
                </div>
                <p className={classes.comment}>{issue.comment}</p>
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
