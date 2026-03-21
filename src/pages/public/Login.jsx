import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <section className="auth-card">
      <h1 className="page-title">Iniciar sesión</h1>

      <form className="simple-form">
        <div className="form-field">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            placeholder="Tu nombre de usuario"
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Tu contraseña"
          />
        </div>

        <button type="submit" className="primary-button">
          Entrar
        </button>
      </form>

      <p className="auth-text">
        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </section>
  )
}