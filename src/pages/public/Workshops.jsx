import { useEffect, useState } from 'react'
import { getAllWorkshops } from '../../services/workshopService'
import { Link } from 'react-router-dom'

export default function Workshops() {
  const [workshops, setWorkshops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadWorkshops()
  }, [])

  async function loadWorkshops() {
    try {
      setLoading(true)
      setError('')

      const data = await getAllWorkshops()
      setWorkshops(data || [])
    } catch (error) {
      setError('No se han podido cargar los talleres.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="hero-small">
        <span className="hero-tag">Talleres</span>

        <h1 className="page-title mt-4">Espacios para crear, sentir y compartir</h1>

        <p className="page-text mt-4">
          En EnajenArte entendemos los talleres como experiencias de bienestar y
          creatividad en las que la palabra, la emoción, la escucha y la
          expresión artística ayudan a abrir nuevos caminos personales y
          colectivos.
        </p>

        <p className="page-text mt-4">
          Cada propuesta busca acompañar procesos desde una mirada cercana y
          humana, generando espacios seguros en los que poder explorar, pensar,
          sentir y transformar.
        </p>
      </section>

      <section className="page-card mt-8">
        {loading && <p className="empty-message">Cargando talleres...</p>}

        {!loading && error && <p className="error-message">{error}</p>}

        {!loading && !error && workshops.length === 0 && (
          <p className="empty-message">
            No hay talleres disponibles en este momento.
          </p>
        )}

        {!loading && !error && workshops.length > 0 && (
          <div className="list-grid">
            {workshops.map((workshop) => (
              <article key={workshop.id} className="item-card">
                <span className="service-label">Taller</span>

                <h2 className="card-title mt-3">{workshop.name}</h2>

                <p className="page-text mt-3">{workshop.description}</p>

                <div className="item-data">
                  <p>
                    <span className="item-label">Fecha:</span>{' '}
                    {new Date(workshop.startDate).toLocaleDateString('es-ES')}
                  </p>

                  <p>
                    <span className="item-label">Duración:</span>{' '}
                    {workshop.durationMinutes} min
                  </p>

                  <p>
                    <span className="item-label">Precio:</span> {workshop.price} €
                  </p>

                  <p>
                    <span className="item-label">Modalidad:</span>{' '}
                    {workshop.isOnline ? 'Online' : 'Presencial'}
                  </p>

                  <p>
                    <span className="item-label">Estado:</span> {workshop.status}
                  </p>
                </div>

                <Link to="/contacto" className="primary-button mt-5">
                  Más información
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}