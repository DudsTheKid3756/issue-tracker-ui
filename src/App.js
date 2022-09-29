import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Issues from './Components/Issues/Issues';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Issues />} />
      </Routes>
    </Router>
  );
}

export default App;
