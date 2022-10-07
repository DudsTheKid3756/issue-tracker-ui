import "../Issues.component.css";
import constants from "../../constants";
import { getIssues } from "../../Services/IssueServices";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Issues = () => {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    getIssues(setIssues, setApiError);
  }, []);

  const handleClick = () => {
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
        <CardContent className="content">
          <Typography>
            {issues.map((issue, index) => (
              <div key={issue.id}>
                <h3>{issue.title} </h3>
                <p>
                  {issue.comment} {issue.created}{" "}
                </p>
              </div>
            ))}
            {apiError ? (
              <p className="error">{constants.API_ERROR}</p>
            ) : (
              <button onClick={handleClick}>New Issue</button>
            )}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Issues;
