import { Link } from 'react-router-dom'

export default function SaludLMental() {
  return (
    <>
      <section className="hero-small">
        <span className="hero-tag">Salud L-Mental</span>

        <h1 className="page-title mt-4">
          Espacios para hablar, escuchar y cuidar el bienestar mental
        </h1>

        <p className="page-text mt-4">
          Salud L-Mental es una propuesta de EnajenArte centrada en el bienestar
          mental a través de charlas, coloquios, círculos de escucha y recogida
          de testimonios que ayuden a comprender mejor el malestar y el cuidado
          emocional.
        </p>

        <p className="page-text mt-4">
          Su enfoque busca visibilizar realidades, favorecer la empatía y abrir
          espacios de reflexión que contribuyan a romper estigmas.
        </p>
      </section>

      <section className="page-card mt-8">
        <h2 className="section-title">Charlas y coloquios</h2>

        <div className="section-grid md:grid-cols-2">
          <article className="info-box">
            <h3 className="card-title">Rompiendo estigmas</h3>
            <p className="page-text mt-3">
              Propuestas en primera persona para acercarse a la salud mental
              desde la comprensión, la visibilización y la escucha de historias
              reales.
            </p>
          </article>

          <article className="info-box">
            <h3 className="card-title">Centros educativos y asociaciones</h3>
            <p className="page-text mt-3">
              Actividades orientadas a generar conversación, conciencia y
              acompañamiento en contextos educativos, sociales y comunitarios.
            </p>
          </article>
        </div>
      </section>

      <section className="page-card mt-8">
        <h2 className="section-title">Líneas de trabajo</h2>

        <div className="section-grid md:grid-cols-3">
          <article className="info-box">
            <p className="service-label">Alumnado</p>
            <p className="page-text mt-3">
              Espacios para reflexionar sobre malestar emocional, autocuidado,
              respeto y comprensión de distintos problemas de salud mental.
            </p>
          </article>

          <article className="info-box">
            <p className="service-label">Profesorado</p>
            <p className="page-text mt-3">
              Propuestas orientadas a acompañar al profesorado y reforzar
              herramientas de autoconocimiento, autorregulación y cuidado.
            </p>
          </article>

          <article className="info-box">
            <p className="service-label">Diálogo y escucha</p>
            <p className="page-text mt-3">
              Círculos y encuentros para explorar el malestar, compartir
              recursos y construir una mirada más consciente sobre el bienestar.
            </p>
          </article>
        </div>
      </section>

      <section className="page-card mt-8">
        <div className="max-w-3xl">
          <h2 className="section-title">Una propuesta para acompañar procesos</h2>

          <p className="page-text mt-4">
            Salud L-Mental apuesta por la palabra, la escucha y la reflexión
            compartida como herramientas para comprender lo que nos ocurre y
            generar recursos que ayuden tanto a nivel individual como colectivo.
          </p>

          <p className="page-text mt-4">
            Para más información, contacta con nosotras.
          </p>

          <Link to="/contacto?tema=salud-l-mental" className="primary-button mt-5">
            Contáctanos
          </Link>
        </div>
      </section>
    </>
  )
}