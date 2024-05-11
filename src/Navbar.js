// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Mi Lienzo APP</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Iniciar Sesión</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Crear Cuenta</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/canvas">Escribir Lienzo</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
