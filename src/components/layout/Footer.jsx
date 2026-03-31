export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Función para manejar el scroll al top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text)]">
            EnajenArte
          </h2>

          <p className="mt-3 max-w-md text-sm leading-7 text-[var(--color-text-soft)]">
            Un espacio de creatividad, expresión y bienestar emocional con una
            identidad cercana, amable y humana.
          </p>

          <p className="mt-4 text-sm text-[var(--color-text-soft)]">
            Espacio reservado para futura newsletter.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Navegación
          </h3>

          <div className="mt-4 space-y-3 text-sm text-[var(--color-text-soft)]">
            <a href="/contacto">Contáctame</a>
            <br />
            <a href="/">Quiénes somos</a>
            <br />
            <a href="/">Política de privacidad</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Comunidad
          </h3>

          <div className="mt-4 space-y-3 text-sm text-[var(--color-text-soft)]">
            <a href="/">Instagram</a>
            <br />
            <a href="/talleres">Talleres</a>
            <br />
            <a href="/programas">Programas</a>
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
          <p>Diseño frontend en desarrollo para la versión final del proyecto.</p>
        </div>
      </div>
    </footer>
  )
}