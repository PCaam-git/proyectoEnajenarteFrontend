import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const publicLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-[var(--color-surface-highlight)] text-[var(--color-text)]'
        : 'text-[var(--color-text-soft)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]'
    }`

  function toggleDropdown() {
    setIsOpen(!isOpen)
  }

  function closeDropdown() {
    setIsOpen(false)
  }

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
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/" className={publicLinkClass} onClick={closeDropdown}>
              Inicio
            </NavLink>

            <div className="relative">
              <button
                type="button"
                onClick={toggleDropdown}
                className="rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
              >
                Qué ofrecemos
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-lg">
                  <NavLink
                    to="/talleres"
                    onClick={closeDropdown}
                    className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
                  >
                    Talleres
                  </NavLink>

                  <NavLink
                    to="/programas"
                    onClick={closeDropdown}
                    className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
                  >
                    Programas
                  </NavLink>

                  <NavLink
                    to="/biblioteca-viva"
                    onClick={closeDropdown}
                    className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
                  >
                    Biblioteca Viva
                  </NavLink>

                  <NavLink
                    to="/salud-l-mental"
                    onClick={closeDropdown}
                    className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
                  >
                    Salud L-Mental
                  </NavLink>

                  <NavLink
                    to="/contacto"
                    onClick={closeDropdown}
                    className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
                  >
                    Contacto
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}