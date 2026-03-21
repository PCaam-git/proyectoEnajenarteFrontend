export default function Home() {
  return (
    <section className="page-card">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
        Bienestar creativo
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-primary-dark)] sm:text-5xl">
        Enajenarte
      </h1>

      <p className="page-text max-w-3xl">
        Frontend base del proyecto. 
      </p>

      <div className="section-grid">
        <div className="info-box">
          <h2 className="text-xl font-semibold">Eventos</h2>
          <p className="page-text mt-2">
            Consulta los eventos.
          </p>
        </div>

        <div className="info-box">
          <h2 className="text-xl font-semibold">Workshops</h2>
          <p className="page-text mt-2">
            Consulta los talleres.
          </p>
        </div>
      </div>
    </section>
  )
}