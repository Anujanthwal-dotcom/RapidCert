import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Upload from './components/Upload';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import Success from './components/Success';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

