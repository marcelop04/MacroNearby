
import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarás la lógica de autenticación más adelante
    console.log("Iniciando sesión con:", { email, password });
    onLogin();
  };

  return (
    <div className="panel login-panel">
      <h2>Iniciar Sesión</h2>
      <p className="subtitle">
        Ingresa tus credenciales para acceder a la comunidad y tus rutinas.
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-small btn-block">
          Ingresar
        </button>
      </form>

      <div className="login-footer">
        <p>
          ¿No tienes una cuenta? <a href="#registro">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}