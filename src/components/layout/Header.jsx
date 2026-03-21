import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth()

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-[var(--color-primary)] text-white'
        : 'text-[var(--color-text)] hover:bg-[var(--color-surface-strong)]'
    }`

  function handleLogout() {
    logout()
  }

  return (
    <header className="border-b border-[var(--color-border)] bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <NavLink
            to="/"
            className="text-2xl font-semibold tracking-tight text-[var(--color-primary-dark)]"
          >
            Enajenarte
          </NavLink>
          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            Arte, bienestar y salud mental
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Inicio
          </NavLink>

          <NavLink to="/eventos" className={linkClass}>
            Eventos
          </NavLink>

          <NavLink to="/talleres" className={linkClass}>
            Workshops
          </NavLink>

          {!isAuthenticated() && (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              <NavLink to="/registro" className={linkClass}>
                Registro
              </NavLink>
            </>
          )}

          {isAuthenticated() && !isAdmin() && (
            <>
              <NavLink to="/perfil" className={linkClass}>
                Perfil
              </NavLink>

              <NavLink to="/mis-inscripciones" className={linkClass}>
                Mis inscripciones
              </NavLink>
            </>
          )}

          {isAuthenticated() && isAdmin() && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}

          {isAuthenticated() && (
            <button type="button" className="primary-button" onClick={handleLogout}>
              Salir
            </button>
          )}
        </nav>
      </div>

      {isAuthenticated() && user?.username && (
        <div className="mx-auto w-full max-w-6xl px-4 pb-4 text-sm text-[var(--color-text-soft)] sm:px-6 lg:px-8">
          Sesión iniciada como <strong>{user.username}</strong>
        </div>
      )}
    </header>
  )
}