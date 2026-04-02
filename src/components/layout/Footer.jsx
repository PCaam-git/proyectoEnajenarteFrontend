import { Link } from 'react-router-dom'
import logoEnajenArte from '../../assets/logoEnajenArte.png'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-6 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:px-8">
        <div>
          <Link to="/" className="inline-block">
            <img
              src={logoEnajenArte}
              alt="EnajenArte"
              className="h-[52px] w-auto origin-left scale-[3.2]"
            />
          </Link>

          <p className="mt-3 max-w-md text-sm leading-7 text-[var(--color-text-soft)]">
            Un espacio de creatividad, expresión y bienestar emocional con una
            identidad cercana, humana y transformadora.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Navegación
          </h3>

          <div className="mt-4 space-y-3 text-sm text-[var(--color-text-soft)]">
            <Link to="/contacto">Contáctame</Link>
            <br />
            <Link to="/">Quiénes somos</Link>
            <br />
            <Link to="/politica-de-privacidad">Política de privacidad</Link>
            <br />
            <Link to="/login">Mi cuenta</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Comunidad
          </h3>

          <div className="mt-4 space-y-3 text-sm text-[var(--color-text-soft)]">
            <a
              href="https://www.instagram.com/enajenarte/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <br />
            <Link to="/talleres">Talleres</Link>
            <br />
            <Link to="/programas">Programas</Link>
          </div>
        </div>

        <div className="flex items-start justify-start lg:justify-end">
          <button
            type="button"
            onClick={scrollToTop}
            className="secondary-button"
            aria-label="Volver arriba"
          >
            ↑
          </button>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-sm text-[var(--color-text-soft)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {currentYear} EnajenArte. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}