import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Canvas from "./Canvas";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./Signup";

const isAuthenticated = () => document.cookie.includes("authorization");

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? <Home /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/canvas"
            element={
              isAuthenticated() ? <Canvas /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
