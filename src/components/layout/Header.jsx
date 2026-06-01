import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logoEnajenArte from "../../assets/logoEnajenArte.png";

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const navButtonClass =
    "inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-soft)]";

  function handleLogout() {
    logout();
    navigate("/Login");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[110rem] items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
        <NavLink to="/" className="shrink-0">
          <img
            src={logoEnajenArte}
            alt="EnajenArte"
            className="h-[52px] w-auto origin-left scale-[3.2]"
          />
        </NavLink>

        <nav className="flex items-center gap-3">
          <div className="group relative">
            <button type="button" className={navButtonClass}>
              Qué ofrecemos
            </button>

            <div className="invisible absolute right-0 mt-2 w-64 translate-y-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <NavLink
                to="/talleres"
                className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
              >
                Talleres
              </NavLink>

              <NavLink
                to="/programas"
                className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
              >
                Programas
              </NavLink>

              <NavLink
                to="/biblioteca-viva"
                className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
              >
                Biblioteca Viva
              </NavLink>

              <NavLink
                to="/salud-l-mental"
                className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
              >
                Salud L-Mental
              </NavLink>

              <NavLink
                to="/contacto"
                className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
              >
                Contacto
              </NavLink>
            </div>
          </div>
          {user ? (
            <div className="group relative">
              <button type="button" className={navButtonClass}>
                Mi cuenta
              </button>

              <div className="invisible absolute right-0 mt-2 w-56 translate-y-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {isAdmin() ? (
                  <>
                    <NavLink
                      to="/admin"
                      className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
                    >
                      Panel de administración
                    </NavLink>

                    <NavLink
                      to="/admin/calendario"
                      className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
                    >
                      Calendario
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/perfil"
                      className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
                    >
                      Mi perfil
                    </NavLink>

                    <NavLink
                      to="/mis-inscripciones"
                      className="block rounded-xl px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
                    >
                      Mis inscripciones
                    </NavLink>
                  </>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full rounded-xl px-4 py-2 text-left text-sm text-[var(--color-text-soft)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className={navButtonClass}>
              Iniciar sesión
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
