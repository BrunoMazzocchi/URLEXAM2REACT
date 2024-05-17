import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Canvas from "./Canvas";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./Signup";

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
