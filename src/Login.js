// Login.js
import React from 'react';

function Login() {
  return (
    <div className="container mt-5">
      <h1>Iniciar Sesión</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Ingresa tu correo electrónico" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" className="form-control" id="password" placeholder="Contraseña" />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
