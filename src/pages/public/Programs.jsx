import { useEffect, useState } from 'react'
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
      setPrograms(data)
    } catch (err) {
      setError('No se han podido cargar los programas.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="hero-small">
        <h1 className="page-title">Programas</h1>
        <p className="page-text">
          Programas formativos y de bienestar.
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
          <div className="list-grid">
            {programs.map((program) => (
              <article key={program.id} className="item-card">
                <h2 className="card-title">{program.name}</h2>

                <p className="page-text mt-2">{program.description}</p>

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
                    <span className="item-label">Modalidad:</span>{' '}
                    {program.isOnline ? 'Online' : 'Presencial'}
                  </p>
                  <p>
                    <span className="item-label">Estado:</span> {program.status}
                  </p>
                  <p>
                    <span className="item-label">Ponente:</span> {program.speakerName}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}