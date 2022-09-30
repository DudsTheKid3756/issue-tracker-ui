import './Issues.component.css';
import constants from '../../constants';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Issues() {
  const [issues, setIssues] = useState([]);
  const [apiError, setApiError] = useState(false);

  const getIssues = () => {
    axios.get(`${constants.BASE_URL}issue`)
      .then(response => {
        const allIssues = response.data;
        setIssues(allIssues);
      })
      .catch((error) => {
        if (error) {
          console.error(`Error: ${error}`);
          setApiError(true);
        }
      })
  }

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <div className="container">
      <Card
        className="card"
        sx={{
          backgroundColor: 'lightgray',
          minWidth: '50%',
          margin: '10px 10px 0px 300px',
          minHeight: '500px',
          display: 'inline-block'
        }}
      >
        <CardHeader title="Issue Tracker" />
        <CardContent className="content">
          <Typography>
            {apiError
              ? <p className='error'>{constants.API_ERROR}</p>
              : issues.map((issue, index) => (
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
                  <button>New Issue</button>
              </div>
              ))}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Issues;
