import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <section className="auth-card">
      <h1 className="page-title">Registro</h1>

      <form className="simple-form">
        <div className="form-field">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
          />
        </div>

        <div className="form-field">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            placeholder="Tu nombre de usuario"
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
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
          Registrarme
        </button>
      </form>

      <p className="auth-text">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </section>
  )
}