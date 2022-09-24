import { Component } from 'react';
import { Route, Router, Routes } from 'react-router-dom';

class App extends Component {
  render() {
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
