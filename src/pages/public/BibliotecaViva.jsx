import { Link } from 'react-router-dom'

export default function BibliotecaViva() {
  return (
    <>
      <section className="hero-small">
        <span className="hero-tag">Biblioteca Viva</span>

        <h1 className="page-title mt-4">
          Historias, memoria e identidad para poner en valor cada lugar
        </h1>

        <p className="page-text mt-4">
          Biblioteca Viva es una propuesta de EnajenArte orientada a rescatar la
          esencia de los pueblos, conservar su legado cultural y dar voz a las
          personas que forman parte de su historia.
        </p>

        <p className="page-text mt-4">
          El objetivo es recuperar tradiciones, testimonios y vivencias para
          transformarlos en una narración compartida que ponga en valor la
          identidad de cada comunidad.
        </p>
      </section>

      <section className="page-card mt-8">
        <div className="max-w-3xl">
          <h2 className="section-title">¿Cómo lo hacemos?</h2>

          <p className="page-text mt-4">
            Nos desplazamos a la localidad durante distintas sesiones para
            escuchar a sus habitantes, investigar su pasado y recoger las
            historias que ayudan a comprender su identidad.
          </p>

          <p className="page-text mt-4">
            A partir de ese proceso, EnajenArte construye una obra que puede
            adoptar el formato que mejor se ajuste a la propuesta: libro
            divulgativo, novela, relatos, cuento infantil o publicación
            ilustrada con fotografías.
          </p>

          <p className="page-text mt-4">
            Además, el proyecto puede ampliarse a otros formatos como podcast,
            documental o exposición fija o itinerante, de forma que la memoria y
            la esencia del lugar puedan compartirse con más personas.
          </p>
        </div>
      </section>

      <section className="page-card mt-8">
        <h2 className="section-title">Qué aporta esta propuesta</h2>

        <div className="section-grid md:grid-cols-3">
          <article className="info-box">
            <p className="service-label">Memoria</p>
            <p className="page-text mt-3">
              Recupera historias, tradiciones y testimonios para conservar el
              patrimonio emocional y cultural de cada lugar.
            </p>
          </article>

          <article className="info-box">
            <p className="service-label">Identidad</p>
            <p className="page-text mt-3">
              Refuerza el valor de la comunidad, sus protagonistas y su legado a
              través de una narración compartida.
            </p>
          </article>

          <article className="info-box">
            <p className="service-label">Difusión</p>
            <p className="page-text mt-3">
              Permite transformar el proyecto en distintos formatos para darle
              continuidad y visibilidad.
            </p>
          </article>
        </div>
      </section>

      <section className="page-card mt-8">
        <div className="max-w-3xl">
          <h2 className="section-title">Una propuesta con mirada humana</h2>

          <p className="page-text mt-4">
            Biblioteca Viva parte de la escucha, el respeto y el cuidado de las
            historias que conforman la vida de un pueblo. No se trata solo de
            documentar, sino de dar valor a lo vivido y convertirlo en un
            recurso cultural con sentido.
          </p>

          <p className="page-text mt-4">
            Para más información, contacta con nosotras.
          </p>

          <Link to="/contacto?tema=biblioteca-viva" className="primary-button mt-5">
            Contáctanos
          </Link>
        </div>
      </section>
    </>
  )
}