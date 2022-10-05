import style from "./Issues.component.css";
import constants from "../../constants";
import { getIssues } from "../../Services/IssueServices";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Issues = () => {
  const navigate = useNavigate();

  const testState = "Test test";

  const [issues, setIssues] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    getIssues(setIssues, setApiError);
  }, []);

  const handleClick = () => {
    navigate("/create", { state: testState }); // test to check passing state to create component
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
            {apiError ? (
              <p className={style.error}>{constants.API_ERROR}</p>
            ) : (
              issues.map((issue, index) => (
                <div key={issue.id}>
                  <h3>{issue.title} </h3>
                  <p>
                    {issue.comment} {issue.created}{" "}
                  </p>
                  <button onClick={handleClick}>New Issue</button>
                </div>
              ))
            )}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Issues;
