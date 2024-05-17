import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Retrieve token from cookie
      const cookies = document.cookie.split(";");
      let token = null;
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "authorization" && value) {
          token = value;
          break;
        }
      }

      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        // Clear the cookie
        document.cookie =
          "authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirect to login page after successful logout
        navigate("/login");
      } else {
        alert("Error logging out. Please try again.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  const isAuthenticated = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "authorization" && value) {
        return true;
      }
    }
    return false;
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ padding: "10px 20px" }}
    >
      <Link className="navbar-brand" to="/">
        Mi Lienzo APP
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {!isAuthenticated() && (
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Iniciar Sesión
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Crear Cuenta
                </Link>
              </li>
            </React.Fragment>
          )}
          {isAuthenticated() && (
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/canvas">
                  Escribir Lienzo
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
