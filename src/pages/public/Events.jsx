import { useEffect, useState } from 'react'
import { getAllEvents } from '../../services/eventService'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    try {
      setLoading(true)
      setError('')

      const data = await getAllEvents()
      setEvents(data)
    } catch (err) {
      setError('No se han podido cargar los eventos.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="hero-small">
        <h1 className="page-title">Eventos</h1>
        <p className="page-text">
          Programas y actividades para entidades y organizaciones.
        </p>
      </section>

      <section className="page-card mt-8">
        {loading && <p className="empty-message">Cargando eventos...</p>}

        {!loading && error && <p className="error-message">{error}</p>}

        {!loading && !error && events.length === 0 && (
          <p className="empty-message">
            No hay eventos disponibles en este momento.
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="list-grid">
            {events.map((event) => (
              <article key={event.id} className="item-card">
                <h2 className="card-title">{event.title}</h2>

                <div className="item-data">
                  <p>
                    <span className="item-label">Ubicación:</span> {event.location}
                  </p>
                  <p>
                    <span className="item-label">Fecha:</span>{' '}
                    {new Date(event.eventDate).toLocaleString('es-ES')}
                  </p>
                  <p>
                    <span className="item-label">Precio:</span> {event.entryFee} €
                  </p>
                  <p>
                    <span className="item-label">Público:</span>{' '}
                    {event.isPublic ? 'Sí' : 'No'}
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