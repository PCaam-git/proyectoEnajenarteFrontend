import { NavLink } from 'react-router-dom'

export default function Header() {
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-[var(--color-primary)] text-white'
        : 'text-[var(--color-text)] hover:bg-[var(--color-surface-strong)]'
    }`

  return (
    <header className="border-b border-[var(--color-border)] bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <NavLink to="/" className="text-2xl font-semibold tracking-tight text-[var(--color-primary-dark)]">
            Enajenarte
          </NavLink>
          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            Arte, bienestar y salud mental
          </p>
        </div>

        <nav className="flex flex-wrap gap-2">
          <NavLink to="/" className={linkClass}>
            Inicio
          </NavLink>
          <NavLink to="/eventos" className={linkClass}>
            Eventos
          </NavLink>
          <NavLink to="/talleres" className={linkClass}>
            Workshops
          </NavLink>
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
          <NavLink to="/registro" className={linkClass}>
            Registro
          </NavLink>
        </nav>
      </div>
    </header>
  )
}