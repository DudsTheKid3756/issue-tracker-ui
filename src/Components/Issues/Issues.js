import './Issues.component.css';
import { Card, CardContent, Typography } from '@mui/material';

function Issues() {
  const name = 'Tyler';

  return (
    <div className="container">
      <Card className="card" sx={{ maxWidth: '50%', display: 'inline-block' }}>
        <CardContent className="content" sx={{ backgroundColor: 'lightgray' }}>
          <Typography>Hi {name}!</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Issues;
