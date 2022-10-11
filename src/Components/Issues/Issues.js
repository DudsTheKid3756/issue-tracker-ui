import constants from "../../Utils/constants";
import { deleteIssue, getIssues } from "../../Services/IssueServices";
import toaster from "../../Utils/toaster";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import classes from "../Issues.module.css";

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

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Issue Tracker</h1>
      <button
        className={classes.button}
        onClick={handleRedirect}
        disabled={isDisabled}
      >
        New Issue
      </button>
      <div className={classes.content}>
        <span>
          {issues.map((issue, index) => (
            <div key={issue.id}>
              <h3 className={classes.title}>
                {issue.id}: {issue.title}
              </h3>
              <p className={classes.comment}>{issue.comment} </p>
              <span className={classes.created}>{issue.created}</span>
              <button
                className={classes.button}
                onClick={() => handleDelete(issue.id)}
              >
                Delete
              </button>
            </div>
          ))}
          {apiError ? toaster(constants.API_ERROR, "error") : null}
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Issues;
