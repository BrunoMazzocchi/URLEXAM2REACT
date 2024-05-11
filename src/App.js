// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Canvas from './Canvas';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/canvas" element={<Canvas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
