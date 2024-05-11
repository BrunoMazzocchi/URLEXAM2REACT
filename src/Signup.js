// Signup.js
import React from 'react';

function Signup() {
  return (
    <div className="container mt-5">
      <h1>Crear Cuenta</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" className="form-control" id="name" placeholder="Ingresa tu nombre" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Ingresa tu correo electrónico" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" className="form-control" id="password" placeholder="Contraseña" />
        </div>
        <button type="submit" className="btn btn-primary">Crear Cuenta</button>
      </form>
    </div>
  );
}

export default Signup;
