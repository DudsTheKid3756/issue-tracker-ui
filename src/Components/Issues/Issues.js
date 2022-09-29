import './Issues.component.css';
import constants from '../../constants';
import { Card, CardContent, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Issues() {
  const [issues, setIssues] = useState([]);

  const getIssues = () => {
    axios.get(`${constants.BASE_URL}issue`)
      .then(response => {
    const allIssues = response.data;
    setIssues(allIssues);
    })
    .catch((error) => console.error(`Error: ${error}`));
  }

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <div className="container">
      <Card className="card" sx={{ maxWidth: '50%', display: 'inline-block' }}>
        <CardContent className="content" sx={{ backgroundColor: 'lightgray' }}>
          <Typography>
              {issues.map((issue, index) => (
                <div key={issue.id}>
                  <h3>
                    {issue.title}
                    {' '}
                  </h3>
                  <p>
                    {issue.comment}
                    {' '}
                  </p>
                  <p>
                    {issue.created}
                    {' '}
                  </p>
              </div>
              ))}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Issues;
