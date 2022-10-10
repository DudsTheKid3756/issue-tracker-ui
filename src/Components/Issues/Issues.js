import "../Issues.component.css";
import constants from "../../Utils/constants";
import { deleteIssue, getIssues } from "../../Services/IssueServices";
import toaster from "../../Utils/toaster";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Issues = () => {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleDelete = (id) => {
    deleteIssue(id, setApiError);
  };

  useEffect(() => {
    getIssues(setIssues, setApiError, setIsDisabled);
  }, [handleDelete]);

  const handleRedirect = () => {
    navigate("/create");
  };

  return (
    <div className="container">
      <Card
        className="card"
        sx={{
          backgroundColor: "lightgray",
          minWidth: "50%",
          margin: "10px 10px 0px 300px",
          minHeight: "500px",
          display: "inline-block",
        }}
      >
        <CardHeader title="Issue Tracker" />
        <button onClick={handleRedirect} disabled={isDisabled}>
          New Issue
        </button>
        <CardContent className="content">
          <Typography component="span">
            {issues.map((issue, index) => (
              <div key={issue.id}>
                <h3>{issue.title} </h3>
                <p>
                  {issue.comment} {issue.created}{" "}
                </p>
                <button onClick={() => handleDelete(issue.id)}>Delete</button>
              </div>
            ))}
            {apiError ? toaster(constants.API_ERROR, "error") : null}
          </Typography>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Issues;
