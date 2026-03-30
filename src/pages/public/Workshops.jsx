import { useEffect, useState } from 'react'
import { getAllWorkshops } from '../../services/workshopService'

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
      setWorkshops(data)
    } catch (err) {
      setError('No se han podido cargar los talleres.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="hero-small">
        <h1 className="page-title">Talleres</h1>
        <p className="page-text">
          Espacios de bienestar y creatividad para particulares.
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
                <h2 className="card-title">{workshop.name}</h2>

                <p className="page-text mt-2">{workshop.description}</p>

                <div className="item-data">
                  <p>
                    <span className="item-label">Inicio:</span>{' '}
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
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}