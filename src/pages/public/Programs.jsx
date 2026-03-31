import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPrograms } from '../../services/programService'

export default function Programs() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPrograms()
  }, [])

  async function loadPrograms() {
    try {
      setLoading(true)
      setError('')

      const data = await getAllPrograms()
      setPrograms(data || [])
    } catch (error) {
      setError('No se han podido cargar los programas.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="hero-small">
        <span className="hero-tag">Programas</span>

        <h1 className="page-title mt-4">Procesos de bienestar para explorar y transformar</h1>

        <p className="page-text mt-4">
          En EnajenArte entendemos los programas como recorridos de
          acompañamiento en los que emoción, pensamiento, creatividad y vínculo
          se integran para abrir procesos de reflexión, cuidado y crecimiento.
        </p>

        <p className="page-text mt-4">
          Son propuestas pensadas para crear experiencias significativas,
          sostenidas en el tiempo y adaptables a distintos contextos, siempre
          desde una mirada cercana, humana y transformadora.
        </p>
      </section>

      <section className="page-card mt-8">
        {loading && <p className="empty-message">Cargando programas...</p>}

        {!loading && error && <p className="error-message">{error}</p>}

        {!loading && !error && programs.length === 0 && (
          <p className="empty-message">
            No hay programas disponibles en este momento.
          </p>
        )}

        {!loading && !error && programs.length > 0 && (
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((program) => (
              <article key={program.id} className="item-card">
                <span className="service-label">Programa</span>

                <h2 className="card-title mt-3">{program.name}</h2>

                <p className="page-text mt-3">{program.description}</p>

                <div className="item-data">
                  <p>
                    <span className="item-label">Inicio:</span>{' '}
                    {new Date(program.initDate).toLocaleDateString('es-ES')}
                  </p>

                  <p>
                    <span className="item-label">Fin:</span>{' '}
                    {new Date(program.finishDate).toLocaleDateString('es-ES')}
                  </p>

                  <p>
                    <span className="item-label">Hora:</span> {program.hour}
                  </p>

                  <p>
                    <span className="item-label">Duración:</span>{' '}
                    {program.durationMinutes} min
                  </p>

                  <p>
                    <span className="item-label">Precio:</span> {program.price} €
                  </p>

                  <p>
                    <span className="item-label">Modalidad:</span>{' '}
                    {program.isOnline ? 'Online' : 'Presencial'}
                  </p>

                  <p>
                    <span className="item-label">Estado:</span> {program.status}
                  </p>

                  {program.speakerName && (
                    <p>
                      <span className="item-label">Ponente:</span>{' '}
                      {program.speakerName}
                    </p>
                  )}
                </div>

                <Link to="/contacto" className="primary-button mt-5">
                  ¡Me apunto!
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}