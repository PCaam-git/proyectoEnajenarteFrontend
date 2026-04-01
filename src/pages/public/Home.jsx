import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-box">
          <span className="hero-tag">Bienestar, creatividad y acompañamiento</span>

          <h1 className="hero-title">EnajenArte</h1>

          <p className="hero-subtitle">
            Un espacio donde la creatividad, la palabra y el cuidado emocional
            se encuentran para acompañar procesos personales y colectivos desde
            una mirada cercana, humana y transformadora.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/talleres" className="primary-button">
              Ver talleres
            </Link>

            <Link to="/programas" className="primary-button">
              Ver programas
            </Link>
          </div>
        </div>
      </section>

      <section className="page-card mt-8">
        <div className="max-w-4xl">
          <h2 className="section-title">La misión de EnajenArte</h2>

          <p className="page-text mt-4">
            Somos Cristinica y Mónica, especialistas en comunicación tanto oral
            como escrita y expertas en organización de eventos culturales.
          </p>

          <p className="page-text mt-4">
            EnajenArte nace para dar voz a nuestro runrún interior. Nos
            convertiremos en «Exploradores Enajenados», personas valientes que
            aprenden a poner de acuerdo lo que sienten, lo que piensan y lo que
            hacen; así como habilidades sociales e individuales para vivir en
            bienestar.
          </p>

          <p className="page-text mt-4">
            Nosotras nos encargamos del abordaje social, de la red de apoyo, los
            talleres, la creatividad y el buen rollo.
          </p>

          <p className="page-text mt-4">
            Tú traerás las ganas de participar, reír, llorar, crear, indagar,
            aprender y crecer.
          </p>

          <p className="page-text mt-4 font-medium">¡Ven con nosotras!</p>
        </div>
      </section>

      <section className="page-card mt-8">
        <h2 className="section-title">Quiénes somos</h2>

        <p className="page-text mt-4 max-w-3xl">
          Juntas combinamos comunicación, creatividad, gestión emocional y
          organización cultural para acompañar procesos personales y colectivos
          desde una mirada cercana, humana y transformadora.
        </p>

        <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
          <article className="info-box">
            <div className="avatar-circle">CG</div>
            <h3 className="card-title">Cristinica Gómez</h3>

            <p className="page-text mt-3">
              Periodista · Correctora profesional · Máster en narrativa ·{' '}
              <i>Community Manager</i> · Experta en inteligencia emocional ·
              Autora de las novelas <i>Diez</i> y <i>Puta Loca</i>
            </p>

            <p className="quote-text">
              Acompaña procesos creativos y personales desde la palabra, la
              escucha y la escritura.
            </p>
          </article>

          <article className="info-box">
            <div className="avatar-circle">MC</div>
            <h3 className="card-title">Mónica Caamaño</h3>

            <p className="page-text mt-3">
              Coach en inteligencia emocional y relacional · Especialista en
              oratoria · Experta en <i>Storytelling</i> · Actriz amateur ·
              Creadora artística · Terapeuta MCA
            </p>

            <p className="quote-text">
              Trabaja la expresión, la presencia y el cuidado emocional desde un
              enfoque cercano y práctico.
            </p>
          </article>
        </div>
      </section>

            <section className="page-card mt-8">
        <h2 className="section-title">Qué ofrecemos</h2>

        <div className="section-grid md:grid-cols-2 xl:grid-cols-4">
          <article className="info-box">
            <p className="service-label">Talleres</p>

            <p className="page-text mt-3">
              Propuestas centradas en el bienestar, la escritura, la emoción y
              la creatividad para personas que desean explorar su mundo interno
              de forma acompañada.
            </p>

            <Link to="/talleres" className="primary-button mt-5">
              Más información
            </Link>
          </article>

          <article className="info-box">
            <p className="service-label">Programas</p>

            <p className="page-text mt-3">
              Procesos de acompañamiento y bienestar pensados para crear
              experiencias sostenidas, humanas y transformadoras.
            </p>

            <Link to="/programas" className="primary-button mt-5">
              Más información
            </Link>
          </article>

          <article className="info-box">
            <p className="service-label">Biblioteca Viva</p>

            <p className="page-text mt-3">
              Una propuesta para recuperar la memoria, las tradiciones y la
              identidad de los lugares a través de historias con valor humano y
              cultural.
            </p>

            <Link to="/biblioteca-viva" className="primary-button mt-5">
              Más información
            </Link>
          </article>

          <article className="info-box">
            <p className="service-label">Salud L-Mental</p>

            <p className="page-text mt-3">
              Espacios de charla, escucha y reflexión para trabajar el bienestar
              mental desde una mirada cercana, consciente y sin estigmas.
            </p>

            <Link to="/salud-l-mental" className="primary-button mt-5">
              Más información
            </Link>
          </article>
        </div>
      </section>

      <section className="page-card mt-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="hero-tag">¡Qué locura es esta!</span>

            <h2 className="section-title mt-4">Hablemos</h2>

            <p className="page-text mt-4">
              Si quieres más información sobre talleres, programas o futuras
              propuestas como Biblioteca Viva y Salud L-Mental, escríbenos y te
              responderemos de forma personalizada.
            </p>

            <p className="page-text mt-4">
              Aquí está compartido en próximas actualizaciones el formulario de contacto.
            </p>

            <Link to="/contacto" className="primary-button mt-5">
              Contáctame
            </Link>
          </div>

          <div className="info-box">
            <h3 className="card-title">Un proyecto con mirada humana</h3>

            <p className="page-text mt-3">
              EnajenArte quiere cuidar tanto el fondo como la forma: crear
              espacios donde las personas se sientan escuchadas, acompañadas y
              con libertad para explorar su historia y su bienestar.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}