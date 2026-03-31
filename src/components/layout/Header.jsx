import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth()

  // Función para determinar la clase de los enlaces públicos
  const publicLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-[var(--color-surface-highlight)] text-[var(--color-text)]'
        : 'text-[var(--color-text-soft)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]'
    }`
  // Función para manejar el cierre de sesión
  function handleLogout() {
    logout()
  }

  // Renderizado del componente Header
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <NavLink
              to="/"
              className="text-3xl font-semibold tracking-tight text-[var(--color-text)]"
            >
              EnajenArte
            </NavLink>

            <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
              Creatividad, bienestar y acompañamiento emocional desde una mirada
              cercana, artística y humana.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!isAuthenticated() && (
              <>
                <NavLink to="/login" className="secondary-button">
                  Iniciar sesión
                </NavLink>

                <NavLink to="/registro" className="primary-button">
                  Registro
                </NavLink>
              </>
            )}

            {isAuthenticated() && !isAdmin() && (
              <>
                <NavLink to="/perfil" className="secondary-button">
                  Perfil
                </NavLink>

                <NavLink to="/mis-inscripciones" className="secondary-button">
                  Mis inscripciones
                </NavLink>

                <button
                  type="button"
                  className="primary-button"
                  onClick={handleLogout}
                >
                  Salir
                </button>
              </>
            )}

            {isAuthenticated() && isAdmin() && (
              <>
                <NavLink to="/admin" className="secondary-button">
                  Admin
                </NavLink>

                <button
                  type="button"
                  className="primary-button"
                  onClick={handleLogout}
                >
                  Salir
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={publicLinkClass}>
            Inicio
          </NavLink>

          <NavLink to="/talleres" className={publicLinkClass}>
            Talleres
          </NavLink>

          <NavLink to="/programas" className={publicLinkClass}>
            Programas
          </NavLink>

          <NavLink to="/contacto" className={publicLinkClass}>
            Contacto
          </NavLink>
        </div>

        {isAuthenticated() && user?.username && (
          <p className="text-sm text-[var(--color-text-soft)]">
            Sesión iniciada como <strong>{user.username}</strong>
          </p>
        )}
      </div>
    </header>
  )
}