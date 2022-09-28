import './Issues.component.css';
import { Card, CardContent, Typography } from '@mui/material';
import getIssues from '../../Services/IssueService';
import { useState, useEffect } from 'react';

function Issues() {
  const [issues, setIssues] = useState({});

  useEffect(() => {
    let mounted = true;
    getIssues().then((i) => {
      if (mounted) {
        setIssues(i);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className="container">
      <Card className="card" sx={{ maxWidth: '50%', display: 'inline-block' }}>
        <CardContent className="content" sx={{ backgroundColor: 'lightgray' }}>
          <Typography>
            <ul>
              {issues.map((issue) => (
                <li key={issue.Id}>
                  {issue.Title} {issue.Comment} {issue.Created} {issue.isCompleted}{' '}
                  {issue.hasReminder}
                </li>
              ))}
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Issues;
