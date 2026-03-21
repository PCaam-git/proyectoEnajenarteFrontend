import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-box">
          <p className="hero-tag">Bienestar creativo</p>

          <h1 className="hero-title">Bienvenidas a Enajenarte</h1>

          <p className="hero-subtitle">
            Espacio de bienestar, creatividad y crecimiento personal a través
            del arte, la escritura y la inteligencia emocional.
          </p>
        </div>
      </section>

      <section className="page-card">
        <h2 className="section-title">Quiénes somos</h2>

        <div className="section-grid">
          <article className="info-box">
            <div className="avatar-circle">CG</div>
            <h3 className="card-title">Cristina Gómez</h3>
            <p className="page-text">
              Periodista · Correctora Profesional · Máster en Narrativa ·
              Community Manager · Experta en Inteligencia Emocional · Autora
            </p>
            <p className="quote-text">
              "Las palabras tienen el poder de sanar y transformar."
            </p>
          </article>

          <article className="info-box">
            <div className="avatar-circle">MC</div>
            <h3 className="card-title">Mónica Caamaño</h3>
            <p className="page-text">
              Coach en Inteligencia Emocional · Especialista en Oratoria ·
              Experta en Storytelling · Actriz · Terapeuta MCA
            </p>
            <p className="quote-text">
              "Tu historia merece ser contada con toda su fuerza."
            </p>
          </article>
        </div>
      </section>

      <section className="page-card mt-8">
        <h2 className="section-title">Nuestros programas</h2>

        <div className="section-grid">
          <article className="info-box">
            <p className="service-icon">✍</p>
            <h3 className="card-title">Talleres</h3>
            <p className="service-label">Para particulares</p>
            <p className="page-text">
              EmoTesoros: talleres de bienestar a través de la escritura y la
              creatividad. Espacios de expresión, autoconocimiento y
              transformación personal.
            </p>
            <Link to="/talleres" className="primary-button mt-4 inline-block">
              Ver talleres
            </Link>
          </article>

          <article className="info-box">
            <p className="service-icon">🌿</p>
            <h3 className="card-title">Eventos</h3>
            <p className="service-label">Para entidades</p>
            <p className="page-text">
              EmoCreativos: programa de gestión de vida a través de la
              creatividad para empresas, centros educativos y organizaciones.
            </p>
            <Link to="/eventos" className="primary-button mt-4 inline-block">
              Ver eventos
            </Link>
          </article>
        </div>
      </section>

      <section className="page-card mt-8">
        <h2 className="section-title">Contacto</h2>

        <div className="section-grid">
          <div className="info-box">
            <h3 className="card-title">Escríbenos</h3>
            <p className="page-text">
              Puedes contactar con Enajenarte para consultar talleres, eventos y
              actividades orientadas al bienestar emocional y la creatividad.
            </p>
          </div>

          <div className="info-box">
            <h3 className="card-title">Teléfono</h3>
            <p className="page-text">
              También puedes llamarnos al <strong>644 898 509</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="page-card mt-8">
        <h2 className="section-title">Únete a nuestra comunidad</h2>
        <p className="page-text">
          Recibe noticias sobre talleres, eventos y recursos de bienestar
          directamente en tu correo.
        </p>
      </section>
    </>
  )
}