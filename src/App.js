import { useState } from 'react';
import { Component } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Issues from './Components/Issues/Issues';

class App extends Component {
  render() {
    const [issues, getIssues] = useState({});

    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Issues />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
